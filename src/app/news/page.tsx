const NEWS_ITEMS = [
  {
    date: "May 2025",
    type: "Award",
    title: "Lab Receives NSERC Discovery Accelerator Supplement",
    body: "Dr. Yang has been awarded the prestigious NSERC Discovery Accelerator Supplement in recognition of exceptional research potential in autonomous navigation and sensor fusion.",
  },
  {
    date: "Apr 2025",
    type: "Publication",
    title: "New Paper Accepted at IEEE TITS",
    body: "Our paper on deep LiDAR-camera-IMU fusion for urban navigation has been accepted for publication in IEEE Transactions on Intelligent Transportation Systems.",
  },
  {
    date: "Mar 2025",
    type: "Grant",
    title: "MITACS Globalink Research Award",
    body: "Mohammed Al-Sharif has been awarded a MITACS Globalink Research Award to conduct collaborative research at ETH Zürich on LiDAR-based 3D scene understanding.",
  },
  {
    date: "Jan 2025",
    type: "Talk",
    title: "Invited Keynote at ION GNSS+ 2025",
    body: "Dr. Yang will deliver an invited keynote address at the ION GNSS+ 2025 conference in Denver, Colorado on the topic of AI-driven GNSS integrity monitoring.",
  },
  {
    date: "Dec 2024",
    type: "Event",
    title: "INML Open Lab Day",
    body: "The lab hosted its annual open house for prospective graduate students, showcasing ongoing research projects and live demonstrations of autonomous navigation systems.",
  },
  {
    date: "Oct 2024",
    type: "Publication",
    title: "Conference Paper at IEEE/ION PLANS 2024",
    body: "Zewei Chen presented our work on transformer-based radar-vision fusion for odometry estimation at IEEE/ION PLANS in Monterey, California.",
  },
  {
    date: "Sep 2024",
    type: "Grant",
    title: "New Industry Partnership with Trimble Navigation",
    body: "The lab has established a new collaborative research agreement with Trimble Navigation Ltd. to advance multi-constellation GNSS receiver technology.",
  },
];

const TYPE_OPACITY: Record<string, number> = {
  Award: 0.85,
  Grant: 0.65,
  Publication: 0.55,
  Talk: 0.45,
  Event: 0.35,
};

export default function NewsPage() {
  return (
    <div className="nm-page-enter nm-page-shell">
      <div className="nm-label">Lab Updates</div>
      <h1 className="nm-page-title mb-10 sm:mb-16">News &amp; Announcements</h1>

      <div className="flex flex-col">
        {NEWS_ITEMS.map((item, i) => {
          const opacity = TYPE_OPACITY[item.type] ?? 0.45;
          return (
            <div
              key={i}
              className="grid grid-cols-1 gap-4 border-b border-[rgba(255,255,255,0.05)] py-6 last:border-0 md:grid-cols-[120px_1fr] md:gap-12 md:py-8"
            >
              {/* Left Column: Date + Type */}
              <div className="flex flex-col items-start">
                <div className="font-mono text-[9px] text-white/30 uppercase tracking-widest mb-1.5">
                  {item.date}
                </div>
                <div
                  className="font-mono text-[9px] uppercase tracking-widest pb-1 border-b"
                  style={{
                    color: `rgba(255, 255, 255, ${opacity})`,
                    borderColor: `rgba(255, 255, 255, ${opacity * 0.4})`,
                  }}
                >
                  {item.type}
                </div>
              </div>

              {/* Right Column: Title + Body */}
              <div>
                <h2 className="font-syne font-semibold text-[18px] text-white mb-3 leading-snug">
                  {item.title}
                </h2>
                <p className="font-sans font-light text-[14px] leading-[1.75] text-white/45">
                  {item.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
