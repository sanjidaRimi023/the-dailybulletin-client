import React from "react";

const partnerLogos = [
  {
    id: 1,
    name: "TechCorp",
    logoUrl: "https://placehold.co/200x100/white/black?text=TechCorp",
  },
  {
    id: 2,
    name: "Innovate Inc.",
    logoUrl: "https://placehold.co/200x100/white/black?text=Innovate+Inc",
  },
  {
    id: 3,
    name: "Global Media",
    logoUrl: "https://placehold.co/200x100/white/black?text=Global+Media",
  },
  {
    id: 4,
    name: "Quantum Solutions",
    logoUrl: "https://placehold.co/200x100/white/black?text=Quantum",
  },
  {
    id: 5,
    name: "NextGen News",
    logoUrl: "https://placehold.co/200x100/white/black?text=NextGen",
  },
  {
    id: 6,
    name: "Visionary Ventures",
    logoUrl: "https://placehold.co/200x100/white/black?text=Visionary",
  },
  {
    id: 7,
    name: "Apex Digital",
    logoUrl: "https://placehold.co/200x100/white/black?text=Apex+Digital",
  },
];

const Partner = () => {
  const extendedLogos = [...partnerLogos, ...partnerLogos];

  return (
    <>
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
          .animate-scroll {
            animation: scroll 40s linear infinite;
          }
        `}
      </style>

      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-6">
          
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Our Partners
          </h2>

        
          <div className="relative w-full overflow-hidden">
            <div className="flex animate-scroll">
             
              {extendedLogos.map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 mx-6 sm:mx-10" 
                  style={{ width: "160px" }}
                >
                  <div className="transform transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg rounded-lg">
                    <img
                      src={partner.logoUrl}
                      alt={partner.name}
                      className="h-16 w-full object-contain grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Partner;
