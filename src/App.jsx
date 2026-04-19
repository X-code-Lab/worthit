import { useState } from "react";
import T from "./constants/theme";
import CATS from "./constants/categories";
import { fmtINR, fmtFull } from "./utils/format";
import { calcEMI } from "./utils/calc";
import { Logo } from "./components/Logo";
import Card from "./components/Card";
import Field from "./components/Field";
import SldInput from "./components/SldInput";
import MBar from "./components/MBar";
import Badge from "./components/Badge";
import Gauge from "./components/Gauge";
import InfoModal from "./components/InfoModal";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [showInfo, setShowInfo] = useState(false);
  const [mainTab, setMainTab] = useState("afford");
  const [iType, setIType] = useState("compound");
  const [principal, setPrincipal] = useState(1000000);
  const [monthly, setMonthly] = useState(0);
  const [years, setYears] = useState(5);
  const [months, setMonths] = useState(0);
  const [rateY, setRateY] = useState(12);
  const [compound, setCompound] = useState(12);
  const [taxOn, setTaxOn] = useState(false);
  const [taxRate, setTaxRate] = useState(30);
  const [iResult, setIResult] = useState(null);
  const [viewMode, setViewMode] = useState("year");
  const [aScreen, setAScreen] = useState("cat");
  const [selCat, setSelCat] = useState(null);
  const [income, setIncome] = useState(100000);
  const [expenses, setExpenses] = useState(40000);
  const [existEMI, setExistEMI] = useState(0);
  const [savings, setSavings] = useState(500000);
  const [investments, setInvestments] = useState(200000);
  const [price, setPrice] = useState(2000000);
  const [dpPct, setDpPct] = useState(20);
  const [intRate, setIntRate] = useState(9.5);
  const [tenure, setTenure] = useState(48);
  const [aTab, setATab] = useState("overview");

  const c = T[theme];
  const btnP = { width: "100%", height: 52, background: c.accentGrad, border: "none", borderRadius: 16, color: "#fff", fontFamily: "'Figtree',sans-serif", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: `0 4px 18px ${c.accentBg}`, marginTop: 12 };

  const runCalc = () => {
    const totM = years * 12 + months;
    if (!principal || totM < 1) return;
    const mData = [], yData = [];
    let bal = principal, inv = principal, ttax = 0, sb = principal, syrB = principal, yrN = 1;
    for (let m = 1; m <= totM; m++) {
      bal += monthly; sb += monthly; inv += monthly;
      const interest = iType === "simple" ? sb * (rateY / 100 / 12) : bal * (Math.pow(1 + rateY / 100 / compound, compound / 12) - 1);
      bal += interest;
      let th = 0;
      const isYE = m % 12 === 0, isL = m === totM;
      if (isYE || isL) {
        const g = bal - syrB;
        if (taxOn && g > 0) { th = g * (taxRate / 100); bal -= th; ttax += th; }
        yData.push({ label: `Year ${yrN}`, principal: inv, profit: bal - inv, tax: th, final: bal });
        syrB = bal; sb = bal; yrN++;
      }
      mData.push({ label: `Mo ${m}`, principal: inv, profit: bal - inv, tax: th, final: bal, yr: isYE || isL });
    }
    setIResult({ inv, profit: bal - inv, final: bal, ttax, mData, yData });
  };

  const bufferMonths = selCat ? selCat.bufferMo : 3;
  const dp = (price * dpPct) / 100, loan = price - dp, emi = calcEMI(loan, intRate, tenure), totalInt = emi * tenure - loan, totalCost = price + totalInt;
  const surplus = income - expenses - existEMI, postEMI = surplus - emi;
  const emiRatio = income > 0 ? (emi / income) * 100 : 0, totalEMIR = income > 0 ? ((existEMI + emi) / income) * 100 : 0;
  const nw = savings + investments, priceToNW = nw > 0 ? (price / nw) * 100 : 999;
  const isDepr = selCat && ["car", "electronics", "travel"].includes(selCat.id), nwLimit = isDepr ? 50 : 300;
  const emergNeed = expenses * 6, postDPSav = savings - dp;
  const foirOk = totalEMIR <= 50, emergOk = postDPSav >= emergNeed, nwOk = priceToNW <= nwLimit, canAfford = foirOk && emergOk && postEMI > 0;
  const scoreColor = totalEMIR <= 20 ? c.accent : totalEMIR <= 35 ? "#84cc16" : totalEMIR <= 50 ? c.amber : c.warn;
  const emiBuffer = emi * bufferMonths;
  const bankBuffer = emiBuffer + emergNeed;
  const randEMI = calcEMI(price, intRate + 4, tenure), randInt = randEMI * tenure - price;

  return (
    <div style={{ minHeight: "100vh", background: c.bg, color: c.t1, fontFamily: "'Figtree',-apple-system,sans-serif", transition: "background .25s,color .25s" }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: c.card, borderBottom: `1px solid ${c.bdr}`, position: "sticky", top: 0, zIndex: 100, padding: "0 14px", height: 52, backdropFilter: "blur(16px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Logo size={28} />
          <span style={{ fontFamily: "'Lora',serif", fontSize: 14, fontWeight: 600, color: c.t1 }}>WorthIt</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <button onClick={() => setShowInfo(true)} style={{ width: 30, height: 30, border: `1.5px solid ${c.accent}50`, background: c.accentBg, borderRadius: "50%", cursor: "pointer", fontSize: 13, color: c.accent, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontFamily: "'Lora',serif" }}>?</button>
          <div style={{ display: "flex", background: c.tabBg, border: `1px solid ${c.bdr2}`, borderRadius: 100, padding: 2, gap: 2 }}>
            {["light", "dark"].map((t) => (
              <button key={t} onClick={() => setTheme(t)} style={{ width: 28, height: 24, border: "none", background: theme === t ? c.tabOn : "transparent", borderRadius: 100, cursor: "pointer", fontSize: 11, boxShadow: theme === t ? c.shadow : "none", color: c.t1 }}>
                {t === "light" ? "☀️" : "🌙"}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 520, margin: "0 auto", padding: "0 14px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: c.tabBg, border: `1.5px solid ${c.bdr2}`, borderRadius: 16, padding: 4, gap: 4, margin: "14px 0" }}>
          {[{ id: "afford", label: "🏦 Affordability" }, { id: "invest", label: "📈 Investment Calc" }].map((t) => (
            <button key={t.id} onClick={() => { setMainTab(t.id); if (t.id === "afford") setAScreen("cat"); }}
              style={{ height: 46, border: mainTab === t.id ? `1.5px solid ${c.pill}50` : "1.5px solid transparent", background: mainTab === t.id ? c.tabOn : "transparent", borderRadius: 12, cursor: "pointer", fontFamily: "'Figtree',sans-serif", fontSize: 13, fontWeight: 700, color: mainTab === t.id ? c.tabOnTxt : c.tabTxt, boxShadow: mainTab === t.id ? c.shadow : "none", transition: "all .25s" }}>
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, padding: "7px 12px", background: c.pillBg, borderRadius: 10, border: `1px solid ${c.pill}25` }}>
          <div style={{ width: 8, height: 8, borderRadius: 4, background: c.pill, boxShadow: `0 0 8px ${c.pill}` }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: c.pill }}>{mainTab === "invest" ? "Investment Calculator" : "Affordability Analyzer"} — Active</span>
        </div>

        {/* ── INVESTMENT TAB ── */}
        {mainTab === "invest" && (
          <div>
            <Card c={c} style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: c.t3, marginBottom: 12 }}>Interest Type</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: c.tabBg, border: `1px solid ${c.bdr}`, borderRadius: 12, padding: 3, gap: 3, marginBottom: 14 }}>
                {["compound", "simple"].map((t) => (
                  <button key={t} onClick={() => setIType(t)} style={{ height: 42, border: "none", background: iType === t ? c.tabOn : "transparent", borderRadius: 10, cursor: "pointer", fontFamily: "'Figtree',sans-serif", fontSize: 13, fontWeight: 600, color: iType === t ? c.tabOnTxt : c.tabTxt, boxShadow: iType === t ? c.shadow : "none", textTransform: "capitalize" }}>{t}</button>
                ))}
              </div>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: c.t3, marginBottom: 12 }}>Investment</div>
              <Field c={c} label="Initial Investment" value={principal} onChange={setPrincipal} min={0} prefix="₹" />
              <Field c={c} label="Monthly Contribution" value={monthly} onChange={setMonthly} min={0} prefix="₹" hint="optional" />
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: c.t3, marginBottom: 12, marginTop: 4 }}>Period & Rate</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
                <Field c={c} label="Years" value={years} onChange={setYears} min={0} max={100} suffix="yr" />
                <Field c={c} label="Months" value={months} onChange={setMonths} min={0} max={11} suffix="mo" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
                <Field c={c} label="Rate/Year" value={rateY} onChange={setRateY} min={0} step={0.01} suffix="%" />
                <Field c={c} label="Rate/Month" value={parseFloat((rateY / 12).toFixed(4))} onChange={(v) => setRateY(parseFloat((v * 12).toFixed(4)))} min={0} step={0.001} suffix="%" />
              </div>
              {iType === "compound" && (
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: c.t2, marginBottom: 5 }}>Compounding Frequency</div>
                  <select value={compound} onChange={(e) => setCompound(Number(e.target.value))} style={{ width: "100%", height: 48, padding: "0 12px", background: c.inputBg, border: "1.5px solid transparent", borderRadius: 12, color: c.t1, fontFamily: "'Figtree',sans-serif", fontSize: 14, outline: "none", appearance: "none", cursor: "pointer" }}>
                    <option value={1}>Annually</option>
                    <option value={2}>Semi-Annually</option>
                    <option value={4}>Quarterly</option>
                    <option value={12}>Monthly</option>
                    <option value={365}>Daily</option>
                  </select>
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 0", borderTop: `1px solid ${c.bdr}`, marginTop: 4 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: c.t1 }}>Tax on Annual Gains</div>
                  <div style={{ fontSize: 10, color: c.t3, marginTop: 1 }}>Deducts tax at year-end</div>
                </div>
                <div onClick={() => setTaxOn(!taxOn)} style={{ width: 48, height: 28, borderRadius: 100, background: taxOn ? c.accent : c.bdr2, cursor: "pointer", position: "relative", transition: "background .2s" }}>
                  <div style={{ position: "absolute", top: 3, left: taxOn ? 23 : 3, width: 22, height: 22, background: "#fff", borderRadius: "50%", boxShadow: "0 2px 6px rgba(0,0,0,.2)", transition: "left .2s" }} />
                </div>
              </div>
              {taxOn && <Field c={c} label="Tax Rate" value={taxRate} onChange={setTaxRate} min={0} max={100} step={0.1} suffix="%" />}
              <button onClick={runCalc} style={btnP}>Calculate Returns →</button>
            </Card>

            {!iResult ? (
              <Card c={c} style={{ textAlign: "center", padding: 40 }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>📈</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: c.t1 }}>Projection appears here</div>
                <div style={{ fontSize: 12, color: c.t3, marginTop: 4 }}>Enter parameters and tap Calculate.</div>
              </Card>
            ) : (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 9, marginBottom: 14 }}>
                  {[
                    { l: "INVESTED", v: fmtINR(iResult.inv), col: c.indigo, sub: "Principal + SIP" },
                    { l: "PROFIT", v: fmtINR(iResult.profit), col: c.accent, sub: taxOn ? `Tax: ${fmtINR(iResult.ttax)}` : "Before tax" },
                    { l: "FINAL", v: fmtINR(iResult.final), col: c.amber, sub: `${years}yr ${months}mo` },
                  ].map((m, i) => (
                    <div key={i} style={{ background: c.card, border: `1px solid ${c.bdr}`, borderRadius: 16, padding: "14px 10px", position: "relative", overflow: "hidden", boxShadow: c.shadow }}>
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: m.col }} />
                      <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: c.t3, marginBottom: 6 }}>{m.l}</div>
                      <div style={{ fontFamily: "'Lora',serif", fontSize: 15, color: m.col }}>{m.v}</div>
                      <div style={{ fontSize: 8, color: c.t3, marginTop: 3 }}>{m.sub}</div>
                    </div>
                  ))}
                </div>
                <Card c={c} style={{ padding: 0, overflow: "hidden" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderBottom: `1px solid ${c.bdr}`, flexWrap: "wrap", gap: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: c.t1 }}>Growth Breakdown</span>
                    <div style={{ display: "flex", background: c.tabBg, border: `1px solid ${c.bdr2}`, borderRadius: 100, padding: 2, gap: 2 }}>
                      {["month", "year"].map((v) => (
                        <button key={v} onClick={() => setViewMode(v)} style={{ padding: "4px 12px", border: "none", background: viewMode === v ? c.tabOn : "transparent", borderRadius: 100, cursor: "pointer", fontFamily: "'Figtree',sans-serif", fontSize: 10, fontWeight: 600, color: viewMode === v ? c.tabOnTxt : c.tabTxt, boxShadow: viewMode === v ? c.shadow : "none" }}>
                          {v === "month" ? "Monthly" : "Yearly"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{ overflowX: "auto", maxHeight: 320, overflowY: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                      <thead>
                        <tr>
                          {[viewMode === "month" ? "Month" : "Year", "Principal", "Profit", ...(taxOn ? ["Tax"] : []), "Final"].map((h, i) => (
                            <th key={i} style={{ padding: "8px 10px", textAlign: i === 0 ? "left" : "right", fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: c.t3, position: "sticky", top: 0, background: c.card2, borderBottom: `1px solid ${c.bdr}` }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {(viewMode === "month" ? iResult.mData : iResult.yData).map((r, i) => (
                          <tr key={i} style={{ borderBottom: `1px solid ${c.bdr}`, background: viewMode === "month" && r.yr ? c.accentBg : "transparent" }}>
                            <td style={{ padding: "7px 10px", textAlign: "left", color: c.t3, fontSize: 11 }}>{r.label}</td>
                            <td style={{ padding: "7px 10px", textAlign: "right", color: c.t1 }}>{fmtINR(r.principal)}</td>
                            <td style={{ padding: "7px 10px", textAlign: "right", color: c.accent }}>{fmtINR(r.profit)}</td>
                            {taxOn && <td style={{ padding: "7px 10px", textAlign: "right", color: c.warn }}>{r.tax > 0 ? `−${fmtINR(r.tax)}` : "—"}</td>}
                            <td style={{ padding: "7px 10px", textAlign: "right", color: c.amber, fontWeight: 700 }}>{fmtINR(r.final)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </>
            )}
          </div>
        )}

        {/* ── AFFORDABILITY — CATEGORY SCREEN ── */}
        {mainTab === "afford" && aScreen === "cat" && (
          <div>
            <div style={{ textAlign: "center", padding: "12px 0 4px" }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: c.t1 }}>Can You Truly Afford It?</div>
              <div style={{ fontSize: 11, color: c.t3, marginTop: 4 }}>FOIR · 20/4/10 · Net Worth · Emergency checks</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
              {CATS.map((cat) => (
                <div key={cat.id} onClick={() => { setSelCat(cat); setIntRate(cat.rate); setTenure(cat.tenure); setDpPct(cat.dp); setPrice(cat.price); setAScreen("form"); }}
                  style={{ background: c.card, border: `1px solid ${c.bdr}`, borderRadius: 16, padding: "18px 14px", cursor: "pointer", transition: "all .2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = c.accent)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = c.bdr)}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{cat.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: c.t1 }}>{cat.label}</div>
                  <div style={{ fontSize: 10, color: c.t3, marginTop: 3 }}>{cat.rate}% · {cat.tenure}mo</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── AFFORDABILITY — FORM SCREEN ── */}
        {mainTab === "afford" && aScreen === "form" && (
          <div>
            <button onClick={() => setAScreen("cat")} style={{ background: "none", border: "none", color: c.accent, fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 12 }}>← Categories</button>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 28 }}>{selCat?.icon}</span>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: c.t1 }}>{selCat?.label}</div>
                <div style={{ fontSize: 10, color: c.t3 }}>Slide or tap the value to type exact amount</div>
              </div>
            </div>
            <Card c={c} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: c.accent, marginBottom: 12 }}>Income & Expenses</div>
              <SldInput c={c} label="Monthly Income" value={income} onChange={setIncome} min={10000} max={1000000} step={5000} />
              <SldInput c={c} label="Monthly Expenses" value={expenses} onChange={setExpenses} min={5000} max={500000} step={2000} />
              <SldInput c={c} label="Existing EMIs" value={existEMI} onChange={setExistEMI} min={0} max={200000} step={1000} />
            </Card>
            <Card c={c} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: c.accent, marginBottom: 12 }}>Savings & Net Worth</div>
              <SldInput c={c} label="Liquid Savings" value={savings} onChange={setSavings} min={0} max={10000000} step={25000} />
              <SldInput c={c} label="Investments" value={investments} onChange={setInvestments} min={0} max={50000000} step={50000} />
            </Card>
            <Card c={c} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: c.amber, marginBottom: 12 }}>Purchase & Loan</div>
              <SldInput c={c} label="Purchase Price" value={price} onChange={setPrice} min={10000} max={100000000} step={10000} />
              <SldInput c={c} label="Down Payment %" value={dpPct} onChange={setDpPct} min={0} max={100} step={1} format={(v) => `${v}%`} prefix="" />
              <SldInput c={c} label="Interest Rate" value={intRate} onChange={setIntRate} min={4} max={24} step={0.25} format={(v) => `${v}%`} prefix="" />
              <SldInput c={c} label="Tenure (months)" value={tenure} onChange={setTenure} min={3} max={360} step={1} format={(v) => `${v}mo`} prefix="" />
            </Card>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
              {[{ l: "Down Pay", v: fmtINR(dp) }, { l: "Loan", v: fmtINR(loan) }, { l: "EMI/mo", v: fmtINR(emi) }].map((x, i) => (
                <div key={i} style={{ background: c.card2, borderRadius: 12, padding: 12, textAlign: "center", border: `1px solid ${c.bdr}` }}>
                  <div style={{ fontSize: 9, color: c.t3 }}>{x.l}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: i === 2 ? c.accent : c.t1, fontFamily: "monospace", marginTop: 4 }}>{x.v}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setAScreen("results")} style={btnP}>Analyze Affordability →</button>
          </div>
        )}

        {/* ── AFFORDABILITY — RESULTS SCREEN ── */}
        {mainTab === "afford" && aScreen === "results" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <button onClick={() => setAScreen("form")} style={{ background: "none", border: "none", color: c.accent, fontSize: 13, cursor: "pointer", padding: 0 }}>← Edit</button>
              <button onClick={() => setAScreen("cat")} style={{ background: "none", border: "none", color: c.t3, fontSize: 11, cursor: "pointer", padding: 0 }}>New</button>
            </div>

            <Card c={c} glow style={{ textAlign: "center", marginBottom: 14, borderColor: canAfford ? `${c.accent}40` : `${c.warn}40` }}>
              <div style={{ fontSize: 36, marginBottom: 4 }}>{canAfford ? "✅" : "⚠️"}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: canAfford ? c.accent : c.warn }}>{canAfford ? "You Can Afford This!" : "Not Yet Affordable"}</div>
              <div style={{ fontSize: 11, color: c.t3, marginTop: 6 }}>{selCat?.icon} {selCat?.label} · {fmtINR(price)}</div>
              <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 12 }}>
                <Gauge value={totalEMIR} max={100} label="FOIR" color={scoreColor} />
                <Gauge value={Math.min(priceToNW, 100)} max={100} label="NW %" color={priceToNW > nwLimit ? c.warn : c.accent} />
              </div>
            </Card>

            <div style={{ display: "flex", gap: 4, overflowX: "auto", marginBottom: 14, paddingBottom: 4 }}>
              {["overview", "rules", "impact", "plan", "guide"].map((t) => (
                <button key={t} onClick={() => setATab(t)} style={{ padding: "8px 14px", borderRadius: 20, border: aTab === t ? `1.5px solid ${c.pill}60` : "1.5px solid transparent", cursor: "pointer", fontSize: 11, fontWeight: 600, whiteSpace: "nowrap", flexShrink: 0, background: aTab === t ? c.pillBg : c.fill, color: aTab === t ? c.pill : c.t3, textTransform: "capitalize" }}>{t}</button>
              ))}
            </div>

            {aTab === "overview" && (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
                  {[
                    { l: "Monthly EMI", v: fmtFull(emi), col: c.indigo },
                    { l: "Total Interest", v: fmtINR(totalInt), col: c.amber },
                    { l: "Total Cost", v: fmtINR(totalCost), col: c.warn },
                    { l: "Post-EMI Surplus", v: fmtINR(Math.max(0, postEMI)), col: postEMI > 0 ? c.accent : c.warn },
                  ].map((x, i) => (
                    <div key={i} style={{ background: c.card2, borderRadius: 14, padding: 14, border: `1px solid ${c.bdr}` }}>
                      <div style={{ fontSize: 9, color: c.t3, textTransform: "uppercase" }}>{x.l}</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: x.col, fontFamily: "monospace", marginTop: 6 }}>{x.v}</div>
                    </div>
                  ))}
                </div>
                <Card c={c}>
                  <div style={{ fontSize: 10, color: c.t3, fontWeight: 600, marginBottom: 12 }}>MONTHLY BREAKDOWN</div>
                  {[
                    { l: "Expenses", v: expenses, col: c.amber },
                    { l: "Existing EMIs", v: existEMI, col: c.warn },
                    { l: "New EMI", v: emi, col: c.indigo },
                    { l: "Remaining", v: Math.max(0, postEMI), col: c.accent },
                  ].map((x, i) => (
                    <div key={i} style={{ marginBottom: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: 11, color: c.t2 }}>{x.l}</span>
                        <span style={{ fontSize: 11, color: x.col, fontFamily: "monospace", fontWeight: 600 }}>{fmtINR(x.v)}</span>
                      </div>
                      <MBar c={c} value={x.v} max={income} color={x.col} />
                    </div>
                  ))}
                </Card>
              </>
            )}

            {aTab === "rules" && (
              <>
                {[
                  { t: "🏦 FOIR Rule", s: "Total EMIs ≤ 50% salary", ok: foirOk, d: `FOIR: ${totalEMIR.toFixed(1)}% — Limit: 50%`, bar: true, bv: totalEMIR },
                  { t: "💰 Net Worth Rule", s: isDepr ? "Depreciating ≤ 50% NW" : "≤ 300% NW", ok: nwOk, d: `${fmtINR(price)} / ${fmtINR(nw)} = ${priceToNW.toFixed(0)}%`, bar: true, bv: priceToNW, bm: nwLimit * 1.5 },
                  { t: "🛡️ Emergency Fund", s: "6mo expenses after DP", ok: emergOk, d: `After DP: ${fmtINR(Math.max(0, postDPSav))} · Need: ${fmtINR(emergNeed)}` },
                ].map((r, i) => (
                  <Card c={c} key={i} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: c.t1 }}>{r.t}</div>
                        <div style={{ fontSize: 10, color: c.t3, marginTop: 2 }}>{r.s}</div>
                      </div>
                      <Badge color={r.ok ? c.accent : c.warn}>{r.ok ? "PASS" : "FAIL"}</Badge>
                    </div>
                    <div style={{ fontSize: 11, color: c.t2, marginBottom: r.bar ? 6 : 0 }}>{r.d}</div>
                    {r.bar && <MBar c={c} value={r.bv} max={r.bm || 100} color={r.ok ? c.accent : c.warn} h={8} />}
                  </Card>
                ))}
                {selCat?.id === "car" && (
                  <Card c={c} style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: c.t1, marginBottom: 10 }}>🚗 20/4/10 Car Rule</div>
                    {[
                      { l: "20% Down", ok: dpPct >= 20, d: `${dpPct}%` },
                      { l: "4yr Max Tenure", ok: tenure <= 48, d: `${tenure}mo` },
                      { l: "10% Income Cap", ok: emiRatio <= 10, d: `${emiRatio.toFixed(1)}%` },
                    ].map((rl, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: j < 2 ? `1px solid ${c.bdr}` : "none" }}>
                        <span>{rl.ok ? "✅" : "❌"}</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: c.t1 }}>{rl.l}</span>
                        <span style={{ fontSize: 10, color: c.t3, marginLeft: "auto" }}>{rl.d}</span>
                      </div>
                    ))}
                  </Card>
                )}
              </>
            )}

            {aTab === "impact" && (
              <>
                <Card c={c} style={{ marginBottom: 14, borderColor: `${c.warn}30` }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: c.warn, marginBottom: 4 }}>⚠️ Random Buy Impact</div>
                  <div style={{ fontSize: 11, color: c.t3, marginBottom: 14 }}>No planning, no DP, higher interest.</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {[
                      { l: "EMI/mo", p: fmtINR(emi), r: fmtINR(randEMI) },
                      { l: "Total Interest", p: fmtINR(totalInt), r: fmtINR(randInt) },
                      { l: "EMI/Income", p: `${emiRatio.toFixed(0)}%`, r: `${(randEMI / income * 100).toFixed(0)}%` },
                      { l: "Extra Cost", p: "—", r: fmtINR(randInt - totalInt) },
                    ].map((x, i) => (
                      <div key={i} style={{ background: c.card2, borderRadius: 12, padding: 12, border: `1px solid ${c.bdr}` }}>
                        <div style={{ fontSize: 9, color: c.t3, textTransform: "uppercase", marginBottom: 6 }}>{x.l}</div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ fontSize: 11, color: c.accent, fontWeight: 600 }}>{x.p}</span>
                          <span style={{ fontSize: 11, color: c.warn, fontWeight: 600 }}>{x.r}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 8, color: c.t3, marginTop: 2 }}>
                          <span>Planned</span><span>Random</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
                <Card c={c}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: c.amber, marginBottom: 6 }}>💸 Cost of Impatience</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: c.warn, fontFamily: "monospace" }}>{fmtINR(randInt - totalInt)}</div>
                  <div style={{ fontSize: 11, color: c.t3, marginTop: 4 }}>= {((randInt - totalInt) / income).toFixed(1)} months salary wasted.</div>
                </Card>
              </>
            )}

            {aTab === "plan" && (
              <Card c={c}>
                <div style={{ fontSize: 13, fontWeight: 700, color: c.accent, marginBottom: 14 }}>📋 Action Plan</div>
                {[
                  { s: "1", t: "Emergency Fund", d: `Target: ${fmtINR(emergNeed)} (6mo expenses). ${emergOk ? "✅ Covered" : `Need ${fmtINR(emergNeed - Math.max(0, savings))} more`}`, ok: emergOk },
                  { s: "2", t: "Down Payment", d: `Target: ${fmtINR(dp)} (${dpPct}%). ${savings >= dp ? "✅ Ready" : `Need ${fmtINR(dp - savings)} more`}`, ok: savings >= dp },
                  { s: "3", t: `Pre-EMI Buffer (${bufferMonths}mo)`, d: `Keep ${fmtINR(emiBuffer)} (${bufferMonths} months of EMI) in bank before signing. For ${selCat?.label?.toLowerCase() || "this"} category, ${bufferMonths} months buffer is recommended.`, ok: postDPSav >= emiBuffer },
                  { s: "4", t: "Clear Existing Debt", d: existEMI > 0 ? `Current: ${fmtINR(existEMI)}/mo — reduces FOIR` : "✅ No existing EMIs", ok: existEMI === 0 },
                  { s: "5", t: "Compare 3+ Lenders", d: `0.5% lower rate saves ${fmtINR(Math.max(0, calcEMI(loan, intRate, tenure) * tenure - calcEMI(loan, Math.max(0, intRate - 0.5), tenure) * tenure))} total`, ok: null },
                  { s: "6", t: "CIBIL 750+", d: "Pay on time, credit utilization < 30%", ok: null },
                ].map((x, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: i < 5 ? `1px solid ${c.bdr}` : "none" }}>
                    <div style={{ width: 26, height: 26, borderRadius: 13, flexShrink: 0, background: x.ok === true ? `${c.accent}20` : x.ok === false ? `${c.warn}20` : `${c.indigo}20`, color: x.ok === true ? c.accent : x.ok === false ? c.warn : c.indigo, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>
                      {x.ok === true ? "✓" : x.s}
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: c.t1 }}>{x.t}</div>
                      <div style={{ fontSize: 10, color: c.t3, marginTop: 3, lineHeight: 1.5 }}>{x.d}</div>
                    </div>
                  </div>
                ))}
              </Card>
            )}

            {aTab === "guide" && (
              <>
                {[
                  { t: "🏦 FOIR Rule", d: "Banks cap total EMIs at 50% of net take-home salary (after TDS, EPF, PT)." },
                  { t: "🚗 20/4/10 Car Rule", d: "20% down, 4yr max tenure, car costs ≤10% income. Car ≤50% annual income." },
                  { t: "💰 Net Worth Rule", d: "Depreciating assets ≤50% NW. Appreciating up to 3x with financing." },
                  { t: "🛡️ Emergency Fund", d: "Single: 3mo. Family: 6mo. Self-employed: 9-12mo. 30% savings + 30% FD + 40% liquid." },
                  { t: "🏧 Pre-EMI Buffer", d: "Big purchases (home, car): 6mo EMI buffer. Small (electronics, travel): 2mo. Always keep emergency fund separate." },
                  { t: "📉 Depreciation", d: "Cars lose 15-20% Year 1, ~45% in 5yr. Electronics lose 40-60% in 2yr." },
                  { t: "💳 CIBIL 750+", d: "Pay on time, utilization <30%, avoid multiple applications." },
                  { t: "🎯 Golden Framework", d: "Emergency → Clear debt → Save DP → Buffer → Compare lenders → Check total cost → 20%+ savings post-EMI." },
                ].map((x, i) => (
                  <Card c={c} key={i} style={{ marginBottom: 8 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: c.t1, marginBottom: 4 }}>{x.t}</div>
                    <div style={{ fontSize: 11, color: c.t3, lineHeight: 1.7 }}>{x.d}</div>
                  </Card>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      <InfoModal c={c} show={showInfo} onClose={() => setShowInfo(false)} tab={mainTab} />
    </div>
  );
}
