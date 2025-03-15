import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

const VisionComponent = () => {
  const [progress, setProgress] = useState({ plan: 0, quality: 0, growth: 0 });
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  React.useEffect(() => {
    if (inView) {
      setProgress({ plan: 95, quality: 85, growth: 65 });
    }
  }, [inView]);

  return (
    <div ref={ref} className="bg-gray-900 text-white py-12 px-6 md:px-20 lg:px-40">
      <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
      <p className="mb-4">
        Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas. Dramatically maintain clicks-and-mortar solutions.
      </p>
      <p className="mb-8">
        Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits. Dramatically visualize customer directed revolutionary ROI. Capitalise on low hanging fruit to identify a ballpark value. Override the digital divide with additional clickthroughs from immersion.
      </p>
      <div className="space-y-6">
        {[
          { label: 'PLAN', value: progress.plan },
          { label: 'QUALITY GUARANTEED', value: progress.quality },
          { label: 'GROWTH', value: progress.growth },
        ].map((item) => (
          <div key={item.label}>
            <div className="flex justify-between mb-1">
              <span>{item.label}</span>
              <span>{item.value}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div
                className="bg-blue-500 h-4 rounded-full transition-all duration-1000"
                style={{ width: `${item.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisionComponent;
