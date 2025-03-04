import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
    const error: any = useRouteError();

    return (
        <div className="mx-4 flex h-screen flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-5xl font-bold">Oops!</h1>
            <p>Một lỗi không mong muốn đã xảy ra.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}
