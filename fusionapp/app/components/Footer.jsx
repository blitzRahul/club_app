import Link from 'next/link';

const navigation = {
    company: [
        { name: 'About', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Jobs', href: '#' },
        { name: 'Press', href: '#' },
    ],
    support: [
        { name: 'Pricing', href: '#' },
        { name: 'Documentation', href: '#' },
        { name: 'Guides', href: '#' },
        { name: 'API Status', href: '#' },
    ],
    legal: [
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Cookies', href: '#' },
    ],
    social: [
        {
            name: 'Instagram',
            href: 'https://www.instagram.com/fusionclub.vit/',
            icon: (props) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        },
        {
            name: 'LinkedIn',
            href: 'https://www.linkedin.com/company/the-fusion-club',
            icon: (props) => (
                <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
                    <path
                        fillRule="nonzero"
                        d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z"
                    ></path>
                </svg>
            ),
        },
        {
            name: 'YouTube',
            href: 'https://www.youtube.com/@fusionclub3751',
            icon: (props) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path
                        fillRule="evenodd"
                        d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        },
    ],
};

export default function Footer() {
    return (
        <footer className='bg-blue-950'>
            <div className="mx-auto max-w-7xl px-2 pb-8 pt-16 sm:pt-16 lg:px-8 lg:pt-20">
                <div className="flex w-full justify-around h-max flex-row">
                    <div className="space-y-8">
                        <div className='flex gap-5 items-center justify-start'>
                            <img
                                className="h-16 md:h-20 lg:h-24 w-auto fill-neutral-950 dark:fill-white rounded-[16px]"
                                alt="The Fusion Club, VIT Bhopal"
                                src='/vit-logo.png'
                            />
                            {/* <img
                                className="h-12 lg:h-16 w-auto bg-white p-3 rounded-[16px]"
                                alt="The Fusion Club, VIT Bhopal"
                                src='/fusionblack.png'
                            /> */}
                        </div>
                    </div>

                    <div className="mt-0 md:grid md:grid-cols-2 md:gap-8 xl:mt-0">
                        <div>
                            <h3 className="text-sm font-semibold leading-6 text-neutral-900 dark:text-neutral-200">
                                VIT Bhopal
                            </h3>
                            <p className="text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                                Bhopal-Indore Highway
                            </p>
                            <p className="text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                                Madhya Pradesh, 466114
                            </p>
                        </div>
                        <div>
                            <h3 className="text-sm mt-3 md:mt-0 font-semibold leading-6 text-neutral-900 dark:text-neutral-200">
                                Contact
                            </h3>
                            <p className="text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                                <Link
                                    href="tel:+919483953149"
                                    className="hover:text-neutral-700 hover:underline dark:hover:text-neutral-300"
                                >
                                    Sudhith N (9483953149)
                                </Link>
                            </p>
                            <p className="text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                                <Link
                                    href="tel:+919823060061"
                                    className="hover:text-neutral-700 hover:underline dark:hover:text-neutral-300"
                                >
                                    Swayam S (9823060061)
                                </Link>
                            </p>
                            <p className="text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                                <Link
                                    href="mailto:fusion@vitbhopal.ac.in"
                                    className="hover:text-neutral-700 hover:underline dark:hover:text-neutral-300"
                                >
                                    fusion@vitbhopal.ac.in
                                </Link>
                            </p>
                            <ul role="list" className="mt-6 flex items-center space-x-4">
                                {navigation.social.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="flex items-center text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300"
                                        >
                                            <span className="sr-only">{item.name}</span>
                                            <item.icon className="h-6 w-6" aria-hidden="true" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* <div className="mt-10 md:mt-0 xl:ml-auto">
                            <h3 className="text-sm font-semibold leading-6 text-neutral-900 dark:text-neutral-200">
                                Support
                            </h3>
                            <ul role="list" className="mt-6 space-y-4">
                                {navigation.support.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className="text-sm leading-6 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className='flex flex-row w-full gap-5 pt-5 border-t-[1px] border-solid border-gray-400 h-max justify-center items-center text-xs text-gray-400 mb-5'>
                <p>&copy;{new Date().getFullYear()} The Fusion Club</p>
                <p>made with ❤ by mank</p>
            </div>
        </footer>
    );
}
