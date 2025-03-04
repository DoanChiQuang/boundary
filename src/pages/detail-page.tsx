import { useParams } from 'react-router-dom';
import Content from '../components/content';
import Header from '../components/header';
import Footer from '../components/footer';

export default function DetailPage() {
    let { id } = useParams();
    return (
        <div className="space-y-6 px-6 py-6">
            <Header />
            <Content id={id} />
            <div className="!mt-20">
                <Footer />
            </div>
        </div>
    );
}
