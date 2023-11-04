// components/LanguageSwitcher.tsx
import { useTranslation } from 'next-i18next';
import Link from "next/link";

const LanguageSwitcher: React.FC = () => {

    return (
        <div>
            <Link href="/" locale="ro">
                To /ro/another
            </Link>
            <Link href="/" locale="hu">
                To /hu/another
            </Link>

        </div>
    );
};

export default LanguageSwitcher;
