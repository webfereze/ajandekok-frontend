// components/LanguageSwitcher.tsx
import Link from "next/link";

const LanguageSwitcher: React.FC = () => {

    return (
        <div className="flex items-center mr-2">
            <Link href="/" locale="ro">
                <div className="mx-1">
                    <svg width={20} height={22} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2">
                        <rect width="1" height="2" x="0" y="0" fill="#002B7F"/>
                        <rect width="1" height="2" x="1" y="0" fill="#FCD116"/>
                        <rect width="1" height="2" x="2" y="0" fill="#CE1126"/>
                    </svg>
                </div>
            </Link>
            <Link href="/" locale="hu">
                <div className="mx-1">
                    <svg width={25} height={35} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 3">
                        <rect fill="#436F4D" width="6" height="3"/>
                        <rect fill="#FFF" width="6" height="2"/>
                        <rect fill="#CD2A3E" width="6" height="1"/>
                    </svg>
                </div>
            </Link>

        </div>
    );
};

export default LanguageSwitcher;
