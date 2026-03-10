export default function About() {
  return (
    <section id="about" className="py-28 border-t border-border">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img
            src="Ellis-Edens-headshot.webp"
            alt="Ellis Eden"
            className="w-full rounded-lg object-cover max-h-96"
          />
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-6">About Me</h2>
            <div className="space-y-4 text-text text-sm leading-relaxed">
              <p>
                Hi, I'm Ellis - a developer with a passion for creating things and working within the intersection of technology and marketing. Solving problems and working with others to build solutions excites me.   
              </p>
              <p>
               I am passionate about understanding the needs of users and translating those needs into actionable solutions. I have experience with a variety of technologies and have dedicated myself to the pursuit of lifelong learning. 
              </p>
              <p>
                When I'm not developing tech or marketing solutions, I'm probably playing Magic the Gathering, preparing for a Dungeons and Dragons session, or strumming my guitar. 
              </p>
            </div>
            <a
              href="/#contact"
              className="inline-block mt-8 bg-primary text-text-inverse px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}