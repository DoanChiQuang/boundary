import Content from '../components/content';
import Footer from '../components/footer';
import Header from '../components/header';

export default function HomePage() {
    return (
        <div className="flex h-screen flex-col space-y-6 px-6 py-6 sm:px-0">
            <Header />
            <div className="grow">
                <Content />
            </div>
            <Footer />
        </div>
    );
}
