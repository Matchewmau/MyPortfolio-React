const services = [
    {
        title: "Web Development",
        description: "Building responsive and modern websites tailored to your needs.",
        image: "/services/webDev.png"
    },
    {
        title: "UI/UX Design",
        description: "Designing intuitive user interfaces and experiences.",
        image: "/services/UIUX.png"
    },
    {
        title: "Content Creation",
        description: "Crafting engaging content for your audience.",
        image: "/services/contentCreation.png"
    },
    {
        title: "Digital Marketing",
        description: "Promoting your brand through various digital channels.",
        image: "/services/digiMarket.png"
    },
]

export const ServiceSection = () => {
    return (
        <section id="services" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                    Offered <span className="text-primary">Services</span>
                </h2>
                <p className="text-lg text-center mb-12">
                    I offer a range of professional services designed to bring your digital ideas to life.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Service Cards */}
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-card border border-primary/10 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex items-start gap-6 card-hover"
                        >
                            <div className="shrink-0 rounded-full bg-primary/10 p-3 flex items-center justify-center w-16 h-16">
                                <img 
                                    src={service.image} 
                                    alt={service.title}
                                    className="w-10 h-10 object-contain"
                                />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                                <p className="text-sm text-muted-foreground">{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}