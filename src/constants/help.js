const HELP = [
  {
    tab: "invest",
    title: "📈 Investment Calculator — Help",
    items: [
      { q: "What does this do?", a: "Calculates how your money grows over time with compound or simple interest. Perfect for FD, MF, SIP planning." },
      { q: "Example: ₹5L + ₹10K/month at 12% for 10yr", a: "Enter ₹5,00,000 as Initial Investment, ₹10,000 Monthly, 10 Years, 12% Rate. Your ₹17.5L grows to ~₹29.6L!" },
      { q: "What is Compounding Frequency?", a: "How often interest is added. Monthly = most MFs. Quarterly = most FDs." },
      { q: "Tax on Annual Gains?", a: "Turn ON to see real impact. Deducts tax at year-end and carries forward after-tax balance." },
    ],
  },
  {
    tab: "afford",
    title: "🏦 Affordability — Help",
    items: [
      { q: "What does this do?", a: "Checks if you can truly afford a purchase using FOIR, 20/4/10, net worth rule, and emergency fund safety checks." },
      { q: "Example: ₹20L car on ₹1L salary?", a: "Select Car → ₹1L income, ₹40K expenses, 0 EMIs, ₹5L savings. 20% down, 9.5%, 48mo → EMI ₹40K. FOIR 40% PASS. But 20/4/10 says car costs ≤10% income. Verdict: NOT affordable at this price." },
      { q: "What is FOIR?", a: "Banks mandate ALL EMIs ≤ 50% of net take-home salary. Above 50% = loan rejection." },
      { q: "Slider vs typing?", a: "You can use sliders for quick adjustment OR tap the number to type exact amounts. Both work!" },
      { q: "Pre-EMI Buffer?", a: "For big purchases (home, car): 6 months EMI in bank. For small (electronics, travel): 2 months. Plus your emergency fund must stay intact." },
    ],
  },
];

export default HELP;
