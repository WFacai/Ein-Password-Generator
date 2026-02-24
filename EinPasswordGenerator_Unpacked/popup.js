const DEFAULTS = {
  length: 16,
  incUpper: true,
  incLower: true,
  incDigits: true,
  incSymbols: true,
  useCustomSymbols: false,
  customSymbols: "!@#$%^&*()-_=+[]{};:,.<>/?",
  excSimilar: true,
  excAmbiguous: true,
  noRepeat: false,
  useSeparator: true,
  separatorChar: "-",
  separatorGroup: 4
};

const CHARSETS = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  digits: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.<>/?"
};

const SIMILAR = "Il1O0";
const AMBIGUOUS = "{}[]()/\\'\"`~,;:.<>";

const el = (id) => document.getElementById(id);

const ui = {
  passwordOutput: el("passwordOutput"),
  lengthRange: el("lengthRange"),
  lengthNumber: el("lengthNumber"),
  incUpper: el("incUpper"),
  incLower: el("incLower"),
  incDigits: el("incDigits"),
  incSymbols: el("incSymbols"),
  useCustomSymbols: el("useCustomSymbols"),
  customSymbols: el("customSymbols"),
  excSimilar: el("excSimilar"),
  excAmbiguous: el("excAmbiguous"),
  noRepeat: el("noRepeat"),
  useSeparator: el("useSeparator"),
  separatorChar: el("separatorChar"),
  separatorGroup: el("separatorGroup"),
  btnGenerate: el("btnGenerate"),
  btnCopy: el("btnCopy"),
  btnRegenerate: el("btnRegenerate"),
  message: el("message")
};

function randomInt(max) {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return arr[0] % max;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = randomInt(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function uniqueChars(str) {
  return Array.from(new Set(str.split("")));
}

function applyExclusions(pool, settings, isSymbolPool) {
  let result = pool;
  if (settings.excSimilar) {
    result = result
      .split("")
      .filter((c) => !SIMILAR.includes(c))
      .join("");
  }
  if (settings.excAmbiguous && isSymbolPool) {
    result = result
      .split("")
      .filter((c) => !AMBIGUOUS.includes(c))
      .join("");
  }
  return result;
}

function buildPools(settings) {
  const pools = [];

  if (settings.incUpper) {
    pools.push(applyExclusions(CHARSETS.upper, settings, false));
  }
  if (settings.incLower) {
    pools.push(applyExclusions(CHARSETS.lower, settings, false));
  }
  if (settings.incDigits) {
    pools.push(applyExclusions(CHARSETS.digits, settings, false));
  }
  if (settings.incSymbols) {
    const base = settings.useCustomSymbols
      ? settings.customSymbols
      : CHARSETS.symbols;
    pools.push(applyExclusions(base, settings, true));
  }

  const cleaned = pools.filter((p) => p.length > 0);
  return cleaned;
}

function buildPassword(settings) {
  const pools = buildPools(settings);
  if (pools.length === 0) {
    return { error: "至少选择一种字符类型" };
  }

  const fullPool = pools.join("");
  const uniquePool = uniqueChars(fullPool);

  if (settings.noRepeat && settings.length > uniquePool.length) {
    return { error: "不允许重复时，长度不能大于可用字符数量" };
  }

  const required = [];
  let available = uniquePool.slice();

  for (const pool of pools) {
    const poolChars = settings.noRepeat
      ? available.filter((c) => pool.includes(c))
      : pool.split("");

    if (poolChars.length === 0) {
      return { error: "字符池为空，请调整排除规则" };
    }

    const picked = poolChars[randomInt(poolChars.length)];
    required.push(picked);

    if (settings.noRepeat) {
      available = available.filter((c) => c !== picked);
    }
  }

  const remaining = settings.length - required.length;
  if (remaining < 0) {
    return { error: "长度太小，无法满足每类至少一个字符" };
  }

  const result = required.slice();
  for (let i = 0; i < remaining; i += 1) {
    if (settings.noRepeat) {
      const idx = randomInt(available.length);
      result.push(available[idx]);
      available.splice(idx, 1);
    } else {
      result.push(fullPool[randomInt(fullPool.length)]);
    }
  }

  shuffle(result);
  return { value: result.join("") };
}

function applySeparator(value, settings) {
  if (!settings.useSeparator) {
    return value;
  }
  const group = Number(settings.separatorGroup) || 0;
  if (group <= 0) {
    return value;
  }
  const parts = value.match(new RegExp(`.{1,${group}}`, "g"));
  if (!parts) {
    return value;
  }
  const sep = settings.separatorChar || "-";
  return parts.join(sep);
}

function readSettingsFromUI() {
  return {
    length: Number(ui.lengthNumber.value),
    incUpper: ui.incUpper.checked,
    incLower: ui.incLower.checked,
    incDigits: ui.incDigits.checked,
    incSymbols: ui.incSymbols.checked,
    useCustomSymbols: ui.useCustomSymbols.checked,
    customSymbols: ui.customSymbols.value.trim() || CHARSETS.symbols,
    excSimilar: ui.excSimilar.checked,
    excAmbiguous: ui.excAmbiguous.checked,
    noRepeat: ui.noRepeat.checked,
    useSeparator: ui.useSeparator.checked,
    separatorChar: ui.separatorChar.value || "-",
    separatorGroup: Number(ui.separatorGroup.value) || DEFAULTS.separatorGroup
  };
}

function applySettingsToUI(settings) {
  ui.lengthRange.value = settings.length;
  ui.lengthNumber.value = settings.length;
  ui.incUpper.checked = settings.incUpper;
  ui.incLower.checked = settings.incLower;
  ui.incDigits.checked = settings.incDigits;
  ui.incSymbols.checked = settings.incSymbols;
  ui.useCustomSymbols.checked = settings.useCustomSymbols;
  ui.customSymbols.value = settings.customSymbols;
  ui.excSimilar.checked = settings.excSimilar;
  ui.excAmbiguous.checked = settings.excAmbiguous;
  ui.noRepeat.checked = settings.noRepeat;
  ui.useSeparator.checked = settings.useSeparator;
  ui.separatorChar.value = settings.separatorChar;
  ui.separatorGroup.value = settings.separatorGroup;
}

function updateMessage(text) {
  ui.message.textContent = text || "";
}

function generateAndRender() {
  const settings = readSettingsFromUI();
  const result = buildPassword(settings);

  if (result.error) {
    updateMessage(result.error);
    ui.passwordOutput.value = "";
    return;
  }

  const formatted = applySeparator(result.value, settings);
  ui.passwordOutput.value = formatted;
  updateMessage("");

  chrome.storage.sync.set({ settings });
}

function bindEvents() {
  ui.lengthRange.addEventListener("input", () => {
    ui.lengthNumber.value = ui.lengthRange.value;
    generateAndRender();
  });

  ui.lengthNumber.addEventListener("input", () => {
    let value = Number(ui.lengthNumber.value);
    if (Number.isNaN(value)) {
      value = DEFAULTS.length;
    }
    value = Math.max(4, Math.min(64, value));
    ui.lengthNumber.value = value;
    ui.lengthRange.value = value;
    generateAndRender();
  });

  [
    ui.incUpper,
    ui.incLower,
    ui.incDigits,
    ui.incSymbols,
    ui.useCustomSymbols,
    ui.customSymbols,
    ui.excSimilar,
    ui.excAmbiguous,
    ui.noRepeat,
    ui.useSeparator,
    ui.separatorChar,
    ui.separatorGroup
  ].forEach((node) => {
    node.addEventListener("input", generateAndRender);
  });

  ui.btnGenerate.addEventListener("click", generateAndRender);
  ui.btnRegenerate.addEventListener("click", generateAndRender);

  ui.btnCopy.addEventListener("click", async () => {
    const value = ui.passwordOutput.value;
    if (!value) {
      updateMessage("没有可复制的密码");
      return;
    }
    try {
      await navigator.clipboard.writeText(value);
      updateMessage("已复制");
      setTimeout(() => updateMessage(""), 1200);
    } catch (err) {
      updateMessage("复制失败");
    }
  });
}

function init() {
  chrome.storage.sync.get("settings", (data) => {
    const settings = Object.assign({}, DEFAULTS, data.settings || {});
    applySettingsToUI(settings);
    bindEvents();
    generateAndRender();
  });
}

document.addEventListener("DOMContentLoaded", init);
