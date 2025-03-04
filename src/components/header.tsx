import LogoDoan from '../assets/HuyHieuDoan.png';
import LogoThanhNien from '../assets/ThanhNienVietNam.png';

export default function Header() {
    return (
        <div className="space-y-2 text-center">
            <div className="space-x-2">
                <img
                    className="inline w-16"
                    src={LogoDoan}
                    alt="Hình Huy Hiệu Đoàn"
                />
                <img
                    className="inline w-16"
                    src={LogoThanhNien}
                    alt="Hình Thanh niên Việt Nam"
                />
            </div>
            <p className="text-md font-bold text-blue-900 uppercase">
                Phường 7 quận 8
            </p>
        </div>
    );
}
