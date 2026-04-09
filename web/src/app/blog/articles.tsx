import { type ReactNode } from "react";

export type Article = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  date: string;
  content: () => ReactNode;
};

export const articles: Article[] = [
  {
    slug: "how-to-calculate-real-food-cost",
    title: "How to Calculate Your Real Food Cost",
    category: "Food Cost",
    excerpt: "Most restaurant owners think they know their food cost. Most are wrong. Here's the formula that actually works.",
    readTime: "4 min",
    date: "2026-04-01",
    content: () => (
      <>
        <p>Ask most restaurant owners their food cost and they&apos;ll give you a number. Ask them how they calculated it and you&apos;ll get a shrug. The truth is, most owners are guessing — and that guess is usually off by 5-10%.</p>
        <h2>The formula</h2>
        <p>Real food cost is simple math, but you need the right inputs:</p>
        <p><strong>Food Cost % = (Beginning Inventory + Purchases - Ending Inventory) / Food Sales x 100</strong></p>
        <p>That&apos;s it. But here&apos;s where most owners go wrong:</p>
        <h2>Mistake #1: Using purchase cost instead of actual usage</h2>
        <p>If you bought $5,000 in food this week but only used $3,800 of it, your food cost isn&apos;t based on $5,000. It&apos;s based on what you actually used. That&apos;s why inventory counts matter — and why most owners skip them.</p>
        <h2>Mistake #2: Not accounting for waste</h2>
        <p>Dropped plates, expired product, overportioning, employee meals — these all eat into your food cost but never show up on a receipt. The gap between what you buy and what you sell is where profit disappears.</p>
        <h2>Mistake #3: Checking quarterly instead of weekly</h2>
        <p>Food costs change fast. A supplier raises chicken by 12% and you don&apos;t notice for six weeks? That&apos;s hundreds of dollars gone. The owners who stay profitable check their numbers weekly — or better yet, they get them automatically.</p>
        <h2>What &quot;good&quot; looks like</h2>
        <p>For most independent restaurants, a healthy food cost falls between 28-35% depending on your concept. Fine dining can run higher (35-40%). Fast casual should be lower (25-30%). But the number only matters if you&apos;re tracking it consistently.</p>
        <h2>The easier way</h2>
        <p>Expo tracks your invoice prices automatically. Text a photo of any supplier invoice, and Expo reads every line item, logs the prices, and alerts you the second something goes up. No spreadsheets, no manual entry. Just a photo and an answer.</p>
      </>
    ),
  },
  {
    slug: "5-signs-youre-overstaffed",
    title: "5 Signs You're Overstaffed on a Slow Night",
    category: "Staffing",
    excerpt: "That extra person on the floor isn't just standing around — they're costing you $40-60 in labor you didn't need to spend.",
    readTime: "3 min",
    date: "2026-03-28",
    content: () => (
      <>
        <p>Every restaurant owner has been there. It&apos;s a Tuesday night, the dining room is half empty, and you&apos;ve got four servers standing around folding napkins. That&apos;s not just wasted time — it&apos;s $40-60 per extra person in labor you didn&apos;t need to spend.</p>
        <h2>1. Your servers are doing side work during service</h2>
        <p>If your front-of-house staff has time to roll silverware, clean baseboards, or organize the storage room during dinner service, you have too many people on the floor. Side work happens before and after — not during.</p>
        <h2>2. Your labor cost is above 35%</h2>
        <p>Check your labor percentage for the shift, not just the day. If you&apos;re running 35%+ during a slow period, you&apos;re overstaffed. Most restaurants should target 25-30% on labor, with some flexibility during peak hours.</p>
        <h2>3. Sales per labor hour drops below $40</h2>
        <p>Take your sales for the shift and divide by total labor hours worked. If that number drops below $40, you&apos;re paying more in labor than the sales justify. This is one of the fastest ways to spot overstaffing in real time.</p>
        <h2>4. You have more servers than tables with guests</h2>
        <p>A good server can handle 4-6 tables comfortably. If you&apos;ve got 3 servers and only 8 occupied tables, someone should go home. It&apos;s not personal — it&apos;s math.</p>
        <h2>5. You&apos;re scheduling based on habit, not data</h2>
        <p>If your Tuesday schedule looks the same every week regardless of how business has been trending, you&apos;re probably overstaffed some nights and understaffed others. Look at your actual sales trends to set your schedule.</p>
        <h2>How to fix it without guessing</h2>
        <p>Expo watches your sales and staffing in real time. When your labor cost starts running high for the current volume, Expo texts you: &quot;You&apos;ve got 4 people on and sales are trending 20% below normal. Consider sending your newest person home.&quot; No checking the POS. No doing math in your head. Just a text.</p>
      </>
    ),
  },
  {
    slug: "why-most-owners-dont-know-if-theyre-profitable",
    title: "Why Most Restaurant Owners Don't Know If They're Profitable",
    category: "Finance",
    excerpt: "Your POS tells you how much you sold. It doesn't tell you if you made money. There's a big difference.",
    readTime: "4 min",
    date: "2026-03-25",
    content: () => (
      <>
        <p>Here&apos;s a question that makes most restaurant owners uncomfortable: are you actually profitable right now? Not last quarter. Not last year. Right now — this week, this month.</p>
        <p>If you hesitated, you&apos;re not alone. Most independent restaurant owners don&apos;t know their real profitability until their accountant tells them — weeks or months after the money is already spent.</p>
        <h2>The revenue trap</h2>
        <p>Your Square dashboard shows you sold $48,000 last month. That feels good. But after food cost (32%), labor (29%), rent, utilities, insurance, and supplies — how much is actually left? For many restaurants, the answer is razor thin: 3-5% net profit if you&apos;re lucky.</p>
        <h2>The data is scattered</h2>
        <p>Your sales are in Square. Your labor is partially in Square, partially in your scheduling app. Your food costs are in a pile of invoices. Your bank balance is in your banking app. Your rent and utilities are in your head. No single tool connects all of this — which means no single tool can tell you if you&apos;re actually making money.</p>
        <h2>The timing problem</h2>
        <p>Even if you sit down and calculate everything, by the time you have the answer, the moment has passed. That slow Tuesday where you overstaffed? Gone. The supplier price hike you didn&apos;t catch? Already ate into a month of margins. Profitability needs to be monitored in real time, not reviewed in hindsight.</p>
        <h2>What would change if you knew?</h2>
        <p>Imagine knowing at 2pm that today&apos;s labor is running high and you should send someone home. Imagine knowing at 7am that yesterday&apos;s food cost spiked because chicken went up 14%. Imagine knowing at midnight that the deposit matched and you can sleep easy.</p>
        <p>That&apos;s what happens when your POS, your bank, and your invoices are all connected — and you can just ask. That&apos;s Expo.</p>
      </>
    ),
  },
  {
    slug: "what-to-look-for-in-daily-sales",
    title: "What to Look For in Your Daily Sales Numbers",
    category: "Operations",
    excerpt: "Total sales is just the headline. Here are the 5 numbers underneath that actually tell you how your restaurant is performing.",
    readTime: "3 min",
    date: "2026-03-22",
    content: () => (
      <>
        <p>Most owners check one number at the end of the day: total sales. If it&apos;s up, good day. If it&apos;s down, bad day. But total sales is the headline — the real story is in the numbers underneath it.</p>
        <h2>1. Average ticket size</h2>
        <p>If your total sales are up but your average ticket is down, you&apos;re getting more traffic but each customer is spending less. That could mean your upselling is slipping, your menu mix is shifting, or your specials aren&apos;t working. Conversely, if tickets are up but order count is flat, you&apos;re getting more from each guest — which is often more sustainable than chasing traffic.</p>
        <h2>2. Order count</h2>
        <p>This is your traffic number. Is it growing week over week? Declining? Flat? Order count trends over 4-8 weeks tell you whether your marketing and location are working better than any single day&apos;s sales total.</p>
        <h2>3. Day-over-day comparison</h2>
        <p>Tuesday vs. last Tuesday is more useful than Tuesday vs. Monday. Compare the same days to spot real trends and filter out normal weekly patterns. A 10% drop from last Tuesday means something. A 30% drop from Saturday is just Wednesday being Wednesday.</p>
        <h2>4. Peak hour performance</h2>
        <p>Where did your sales concentrate? If 60% of your revenue came between 6-8pm, you might be missing the lunch opportunity. If sales were spread evenly, your staffing should reflect that. Peak hours tell you when to invest labor and when to cut.</p>
        <h2>5. Payment mix</h2>
        <p>The split between cash and card affects your cash flow timing. Card payments hit your account 1-2 days later. A heavy cash day means more money in the register but more room for error. Track the mix to understand your deposit patterns.</p>
        <h2>Get these automatically</h2>
        <p>Expo&apos;s morning recap delivers all five of these numbers to your phone at 7am — before you even get to the restaurant. No logging into a dashboard. No pulling reports. Just a text message with everything you need to start the day informed.</p>
      </>
    ),
  },
  {
    slug: "catch-supplier-price-increases",
    title: "How to Catch Supplier Price Increases Before They Eat Your Margin",
    category: "Food Cost",
    excerpt: "A 10% price increase on your top protein costs you hundreds per month. Most owners don't notice for weeks.",
    readTime: "3 min",
    date: "2026-03-18",
    content: () => (
      <>
        <p>Your chicken thighs went from $2.89/lb to $3.19/lb. Doesn&apos;t sound like much, right? If you use 200 lbs a week, that&apos;s $60 more per week — $240 per month — that just vanished from your bottom line. And most owners don&apos;t catch it for weeks because nobody is reading every line on every invoice.</p>
        <h2>Why it slips through</h2>
        <p>Supplier invoices are long, dense, and arrive when you&apos;re busy. You glance at the total, make sure it&apos;s in the ballpark, and move on. The per-unit prices buried in 30+ line items? Nobody has time to cross-reference those against last month&apos;s invoice.</p>
        <h2>The compounding effect</h2>
        <p>One price increase is manageable. But suppliers don&apos;t raise one item at a time. Over a quarter, you might see 5-10 items creep up by 5-15% each. Combined, that can shift your food cost by 2-3 percentage points — the difference between profitable and not.</p>
        <h2>What to do about it</h2>
        <p>The answer isn&apos;t spending an hour every week comparing invoices. It&apos;s having a system that does it for you. Track per-unit prices over time so you see the trend. Flag increases immediately so you can renegotiate, adjust portions, or raise prices while the margin still exists.</p>
        <h2>How Expo handles it</h2>
        <p>Text a photo of any supplier invoice to Expo. It reads every line item, logs the per-unit price, and compares it to previous invoices. When something goes up, you get a message: &quot;Your chicken thighs went from $2.89/lb to $3.19/lb — that&apos;s a 10.4% increase.&quot; No spreadsheets. No manual tracking. Just a photo and an alert.</p>
      </>
    ),
  },
  {
    slug: "real-cost-of-not-tracking-invoices",
    title: "The Real Cost of Not Tracking Your Invoices",
    category: "Finance",
    excerpt: "That shoebox of invoices isn't just messy — it's costing you real money every single week.",
    readTime: "3 min",
    date: "2026-03-15",
    content: () => (
      <>
        <p>Every restaurant has a version of &quot;the shoebox.&quot; Maybe it&apos;s a drawer. Maybe it&apos;s a folder on the counter. Maybe it&apos;s a stack that you tell yourself you&apos;ll get to on Sunday. But those untracked invoices aren&apos;t just a mess — they&apos;re an active drain on your profitability.</p>
        <h2>Hidden price increases</h2>
        <p>If you&apos;re not tracking line-item prices over time, you have no idea when a supplier raises prices. A 10% increase on your top five items could cost you $500+ per month — and without historical data, you&apos;d never know it happened.</p>
        <h2>Inaccurate food cost</h2>
        <p>Your food cost calculation depends on knowing what you purchased. If invoices are sitting in a pile instead of being logged, your food cost number is a fiction. You might think you&apos;re at 30% when you&apos;re really at 34%.</p>
        <h2>Missed billing errors</h2>
        <p>Suppliers make mistakes. Double charges, wrong quantities, items you returned that still show up on the bill. If you&apos;re not reviewing invoices against what was actually delivered, you&apos;re paying for errors that aren&apos;t yours.</p>
        <h2>Tax time chaos</h2>
        <p>When your accountant asks for a year&apos;s worth of purchase records and you hand them a shoebox, two things happen: you pay more in accounting fees, and you probably miss deductions. Organized invoice data saves time and money at tax season.</p>
        <h2>The fix is simple</h2>
        <p>Text a photo of every invoice to Expo as it arrives. Expo reads the line items, logs the prices, tracks trends, and catches increases. It takes 10 seconds per invoice instead of 10 minutes — and your records are always up to date.</p>
      </>
    ),
  },
  {
    slug: "labor-cost-benchmarks",
    title: "Labor Cost Benchmarks: What Percentage Should You Target?",
    category: "Staffing",
    excerpt: "Labor is your biggest controllable cost. Here's what to aim for based on your restaurant type.",
    readTime: "4 min",
    date: "2026-03-12",
    content: () => (
      <>
        <p>Labor is the biggest controllable expense in your restaurant. Unlike rent (fixed) or food cost (semi-variable), labor is something you can adjust shift by shift, day by day. But to manage it, you need to know what &quot;good&quot; looks like.</p>
        <h2>General benchmarks</h2>
        <p>Total labor cost (including wages, taxes, and benefits) as a percentage of total sales:</p>
        <ul>
          <li><strong>Quick service / fast casual:</strong> 25-30%</li>
          <li><strong>Casual dining:</strong> 28-33%</li>
          <li><strong>Fine dining:</strong> 33-40%</li>
          <li><strong>Counter service / takeout heavy:</strong> 20-28%</li>
        </ul>
        <p>These are guidelines, not rules. Your specific number depends on your menu prices, concept, and market. But if you&apos;re consistently outside these ranges, something needs attention.</p>
        <h2>FOH vs. BOH</h2>
        <p>Front-of-house labor (servers, hosts, bussers) and back-of-house labor (cooks, prep, dishwashers) should be tracked separately. A healthy split for casual dining is roughly 40% FOH / 60% BOH. If your FOH labor is running high, you might be overscheduling servers. If BOH is high, look at prep efficiency and kitchen staffing during slow periods.</p>
        <h2>The shift-level view matters most</h2>
        <p>Your daily labor percentage might look fine, but that can mask a lunch shift at 22% (great) and a dinner shift at 38% (too high). Check labor cost by shift to find the real problems.</p>
        <h2>When to cut vs. when to hold</h2>
        <p>Cutting labor too aggressively hurts service quality, which hurts sales, which makes your labor percentage worse. The goal isn&apos;t minimum staffing — it&apos;s right staffing. One extra person during a rush pays for themselves in faster turns and better tips. One extra person during a dead shift is pure waste.</p>
        <h2>Let the data decide</h2>
        <p>Expo monitors your labor cost in real time against your sales volume. When the ratio tips too high, you get a text: &quot;Labor is at 36% and sales are trending below normal. Consider cutting your newest server.&quot; No spreadsheets, no calculators. Just actionable advice when you need it.</p>
      </>
    ),
  },
  {
    slug: "why-texting-beats-dashboards",
    title: "Why Texting Beats Dashboards for Busy Restaurant Owners",
    category: "Using Expo",
    excerpt: "Dashboards were built for people who sit at desks. You're on the floor. There's a better way.",
    readTime: "3 min",
    date: "2026-03-08",
    content: () => (
      <>
        <p>Every restaurant technology promises a &quot;powerful dashboard.&quot; Charts, graphs, filters, date ranges, export buttons. And every restaurant owner has the same reaction: &quot;When am I supposed to look at this?&quot;</p>
        <h2>The dashboard problem</h2>
        <p>Dashboards are built for people who sit at desks. People who have time to log in, navigate menus, filter data, and interpret charts. Restaurant owners are not those people. You&apos;re on the line, managing a rush, checking the walk-in, training a new hire, and trying to remember if anyone called about the catering order. You don&apos;t have &quot;dashboard time.&quot;</p>
        <h2>The information gap</h2>
        <p>This creates a brutal irony: the tools that hold your business data are designed for a workstyle you don&apos;t have. So the data sits there, unused, while you make decisions based on gut feel and memory. Not because you don&apos;t care about the numbers — but because accessing them takes too many steps.</p>
        <h2>Why text works</h2>
        <p>Text messages are the one interface every restaurant owner already uses, all day, every day. You text your staff, your suppliers, your family. There&apos;s no login, no app to open, no screen to navigate. You ask a question, you get an answer. That&apos;s it.</p>
        <h2>Pull vs. push</h2>
        <p>Dashboards are &quot;pull&quot; — you have to go to them. Texts are &quot;push&quot; — the information comes to you. When your labor cost is running high, you don&apos;t need to remember to check. Expo texts you. When your morning recap is ready, you don&apos;t need to log in. It&apos;s already in your messages.</p>
        <h2>The right info at the right time</h2>
        <p>A dashboard shows you everything at once. A text conversation gives you exactly what you need, when you need it. Mid-rush, you don&apos;t need a chart — you need &quot;43 gyros sold, you&apos;re on pace for a big day.&quot; At midnight, you don&apos;t need a report — you need &quot;deposit went through, go to sleep.&quot;</p>
        <p>That&apos;s why Expo is a text conversation, not a dashboard. Because the best interface for a restaurant owner isn&apos;t the most powerful one — it&apos;s the one you&apos;ll actually use.</p>
      </>
    ),
  },
  {
    slug: "morning-routines-successful-owners",
    title: "Morning Routines of Successful Restaurant Owners",
    category: "Operations",
    excerpt: "The best owners don't start their day reacting. They start informed. Here's what to check before you walk in the door.",
    readTime: "3 min",
    date: "2026-03-05",
    content: () => (
      <>
        <p>The difference between a reactive day and a proactive day often comes down to 10 minutes in the morning. The owners who consistently run profitable restaurants don&apos;t start their day wondering what happened yesterday — they already know.</p>
        <h2>Check yesterday&apos;s sales before you arrive</h2>
        <p>Total revenue, order count, and average ticket. How did it compare to the same day last week? Were you up or down? This sets your baseline for the day before you&apos;re even in the building.</p>
        <h2>Review your labor cost</h2>
        <p>What percentage of yesterday&apos;s sales went to labor? If it was above your target, look at which shifts were heavy. This informs today&apos;s staffing decisions before the schedule is locked.</p>
        <h2>Verify the deposit</h2>
        <p>Did last night&apos;s deposit match the card sales? A missing or mismatched deposit is easier to investigate same-day than a week later. Check it in the morning while the details are fresh.</p>
        <h2>Know your top sellers</h2>
        <p>What sold well yesterday? What didn&apos;t move? This affects today&apos;s prep priorities, specials decisions, and how much product to have ready. If gyros are on a three-day hot streak, prep more. If the fish special flopped, adjust.</p>
        <h2>Check your bank balance</h2>
        <p>What&apos;s in the account right now? Any large debits coming (rent, supplier payments, payroll)? A 30-second glance at your balance prevents the &quot;I didn&apos;t realize rent was coming out today&quot; surprise.</p>
        <h2>The 7am text that does all of this</h2>
        <p>Expo sends all five of these things to your phone at 7am every morning. Yesterday&apos;s sales, labor %, deposit status, top sellers, and a comparison to last week. One text, before you even get out of bed. No logging in, no pulling reports, no doing math. Just the numbers you need to walk in prepared.</p>
      </>
    ),
  },
  {
    slug: "deposit-matches-yesterdays-sales",
    title: "How to Tell If Your Deposit Matches Yesterday's Sales",
    category: "Finance",
    excerpt: "A mismatched deposit is a red flag — but most owners don't check until it's too late to investigate.",
    readTime: "3 min",
    date: "2026-03-01",
    content: () => (
      <>
        <p>Every night, your closer counts down the register and makes the bank deposit. But how do you know the deposit actually matches what the POS says you sold? Most owners don&apos;t check — and when there&apos;s a discrepancy, it&apos;s discovered weeks later when the numbers don&apos;t add up.</p>
        <h2>Why deposits don&apos;t always match</h2>
        <p>Card sales deposit separately from cash (usually 1-2 business days later). Cash deposits depend on your closer counting correctly. Tips, voids, refunds, and comps all affect the expected amount. A &quot;matching&quot; deposit isn&apos;t always an exact match — but it should be close.</p>
        <h2>What to compare</h2>
        <p>Pull your card sales total from Square for the day. That&apos;s what should hit your bank account. Cash deposits should equal the cash sales total minus what stays in the till. If the card deposit is off by more than a few dollars, something needs investigating.</p>
        <h2>Common causes of mismatches</h2>
        <ul>
          <li><strong>Timing:</strong> Card deposits take 1-2 business days. Friday&apos;s sales might not post until Monday or Tuesday.</li>
          <li><strong>Processing fees:</strong> Square takes a percentage. Your deposit will be slightly less than total card sales.</li>
          <li><strong>Refunds:</strong> A refund processed today might deduct from tomorrow&apos;s deposit batch.</li>
          <li><strong>Errors:</strong> Voids that weren&apos;t processed correctly, duplicate charges reversed, or tips entered wrong.</li>
        </ul>
        <h2>Check it same-day</h2>
        <p>The best time to investigate a deposit discrepancy is the next morning — while the shift details are still fresh. Was there a large void? A refund? A tip entered incorrectly? Same-day investigation solves problems that become mysteries a week later.</p>
        <h2>Or let Expo check for you</h2>
        <p>Expo matches your Square card sales to your bank deposits automatically. When the deposit posts, you can ask: &quot;Did the deposit go through?&quot; Expo responds with the amount, whether it matches, and flags any discrepancies. Or it&apos;ll include the status in your morning recap. No logging into two apps and doing the math yourself.</p>
      </>
    ),
  },
];
