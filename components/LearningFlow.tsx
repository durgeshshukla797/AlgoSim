export default function LearningFlow() {
  return (
    <section id="quiz" className="py-24 px-6 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-black mb-6">
              Learn the right way
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Each algorithm follows a structured flow:
              Introduction → Pre-Test → Visualization →
              Post-Test → Detailed Feedback.
            </p>
          </div>
          <div className="flex justify-center">
            <LearningIllustration />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 flex justify-center">
            <FlowIllustration />
          </div>
          <div className="order-1 md:order-2">
            <h3 className="font-heading text-3xl font-bold text-black mb-4">
              Structured Learning Path
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our systematic approach ensures you understand not just how
              algorithms work, but why they work and when to use them.
            </p>
            <ul className="space-y-3">
              {[
                'Comprehensive introductions',
                'Pre-assessment quizzes',
                'Interactive visualizations',
                'Post-assessment with feedback',
              ].map((item, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <span className="w-1.5 h-1.5 bg-black rounded-full mr-3"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function LearningIllustration() {
  return (
    <div className="w-full max-w-md">
      <svg viewBox="0 0 400 300" className="w-full h-auto">
        <rect x="50" y="50" width="80" height="60" fill="none" stroke="#000" strokeWidth="2" rx="4" />
        <text x="90" y="85" textAnchor="middle" fill="#000" fontSize="14" fontFamily="Inter, sans-serif">Intro</text>
        
        <line x1="130" y1="80" x2="170" y2="80" stroke="#000" strokeWidth="2" markerEnd="url(#arrowhead)" />
        
        <rect x="170" y="50" width="80" height="60" fill="none" stroke="#000" strokeWidth="2" rx="4" />
        <text x="210" y="85" textAnchor="middle" fill="#000" fontSize="14" fontFamily="Inter, sans-serif">Pre-Test</text>
        
        <line x1="250" y1="80" x2="290" y2="80" stroke="#000" strokeWidth="2" markerEnd="url(#arrowhead)" />
        
        <rect x="290" y="50" width="80" height="60" fill="none" stroke="#000" strokeWidth="2" rx="4" />
        <text x="330" y="85" textAnchor="middle" fill="#000" fontSize="14" fontFamily="Inter, sans-serif">Visualize</text>
        
        <line x1="290" y1="110" x2="290" y2="150" stroke="#000" strokeWidth="2" markerEnd="url(#arrowhead)" />
        
        <rect x="250" y="150" width="80" height="60" fill="none" stroke="#000" strokeWidth="2" rx="4" />
        <text x="290" y="185" textAnchor="middle" fill="#000" fontSize="14" fontFamily="Inter, sans-serif">Post-Test</text>
        
        <line x1="250" y1="180" x2="210" y2="180" stroke="#000" strokeWidth="2" markerEnd="url(#arrowhead)" />
        
        <rect x="130" y="150" width="80" height="60" fill="none" stroke="#000" strokeWidth="2" rx="4" />
        <text x="170" y="185" textAnchor="middle" fill="#000" fontSize="14" fontFamily="Inter, sans-serif">Feedback</text>
        
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#000" />
          </marker>
        </defs>
      </svg>
    </div>
  )
}

function FlowIllustration() {
  return (
    <div className="w-full max-w-md">
      <svg viewBox="0 0 400 300" className="w-full h-auto">
        <circle cx="100" cy="100" r="40" fill="none" stroke="#000" strokeWidth="2" />
        <text x="100" y="107" textAnchor="middle" fill="#000" fontSize="14" fontFamily="Inter, sans-serif">Learn</text>
        
        <line x1="140" y1="100" x2="180" y2="100" stroke="#000" strokeWidth="2" markerEnd="url(#arrowhead2)" />
        
        <circle cx="220" cy="100" r="40" fill="none" stroke="#000" strokeWidth="2" />
        <text x="220" y="107" textAnchor="middle" fill="#000" fontSize="14" fontFamily="Inter, sans-serif">Practice</text>
        
        <line x1="260" y1="100" x2="300" y2="100" stroke="#000" strokeWidth="2" markerEnd="url(#arrowhead2)" />
        
        <circle cx="340" cy="100" r="40" fill="none" stroke="#000" strokeWidth="2" />
        <text x="340" y="107" textAnchor="middle" fill="#000" fontSize="14" fontFamily="Inter, sans-serif">Master</text>
        
        <defs>
          <marker id="arrowhead2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#000" />
          </marker>
        </defs>
      </svg>
    </div>
  )
}
