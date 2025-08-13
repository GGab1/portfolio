import ContactForm from './ContactForm';

const socialLinks = [
    {
        name: 'LinkedIn',
        icon: '/icons/logoLinkedin.png',
        url: 'https://www.linkedin.com/in/gabin-gu%C3%A9rin-995989258/',
    },
    {
        name: 'GitHub',
        icon: '/icons/logoGithub.png',
        url: 'https://github.com/GGab1',
    },
    {
        name: 'Instagram',
        icon: '/icons/logoInsta.png',
        url: 'https://www.instagram.com/ggabin1/',
    },
    {
        name: 'Email',
        icon: '/icons/logoMail.png',
        url: 'mailto:tonmail@example.com',
    }
];

export default function Contact() {
    return (
        <div className="flex h-screen p-6 gap-6 text-white">
            {/* Partie gauche : Formulaire */}
            <div className="w-2/3 flex flex-col justify-center">
                <ContactForm />
            </div>

            {/* Partie droite : bloc Réseaux */}
            <div className="w-1/3 relative rounded-3xl bg-white/20 backdrop-blur-md border border-white shadow p-6 flex flex-col items-center justify-start">
                {/* Badge titre */}
                <div className="absolute z-10 top-5 left-5 bg-white/30 backdrop-blur-md border border-white rounded-full px-3 py-1 shadow text-white whitespace-nowrap inline-flex items-center gap-1">
                    <span>📇</span>
                    <span>Réseaux</span>
                </div>

                {/* Liste des réseaux */}
                <div className="flex flex-col gap-4 mt-16 w-full">
                    {socialLinks.map((social) => (
                        <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 hover:underline hover:opacity-80 transition"
                        >
                            <img src={social.icon} alt={social.name} className="w-6 h-6" />
                            <span className="text-white">{social.name}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
