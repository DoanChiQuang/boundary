type Props = {
    children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
    return <main className="container mx-auto max-w-[1200px]">{children}</main>;
}
