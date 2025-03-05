import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../assets/User.png';
import UserAdminMen from '../assets/UserAdminMen.png';
import UserAdminWomen from '../assets/UserAdminWomen.png';
import EmptyBox from '../assets/EmptyBox.png';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../configs/firebase-config';

type Props = {
    id?: string;
};

type IArea = {
    id: string;
    name: string;
    address: string;
    members: IMember[];
};

type IMember = {
    name: string;
    phone: string;
    role: string;
    isMale: boolean;
    isAdmin: boolean;
};

export default function Content({ id }: Props) {
    const [areas, setAreas] = useState<IArea[]>([]);

    const getAreas = async () => {
        const querySnapshot = await getDocs(collection(db, 'areas'));
        const data: IArea[] = querySnapshot.docs
            .map(
                (doc) =>
                    ({
                        id: doc.id,
                        ...doc.data(),
                    }) as IArea,
            )
            .sort((a: IArea, b: IArea) => parseInt(a.id) - parseInt(b.id));
        setAreas(data);
    };

    const getAreasById = () => {
        if (id == 'all') {
            return areas;
        }
        return areas.filter((area) => area.id == id);
    };

    useEffect(() => {
        getAreas();
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-center text-xl font-bold text-[#0F172A] after:mx-auto after:mt-4 after:block after:h-2 after:w-60 after:rounded-full after:bg-blue-900 sm:text-3xl md:text-5xl">
                Thông Tin Địa Giới Hành Chính
            </h1>
            {!id ? <Search areas={areas} /> : <Detail areas={getAreasById()} />}
        </div>
    );
}

function Search({ areas }: { areas: IArea[] }) {
    const [areaVal, setAreaVal] = useState('');
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center gap-4">
            <h2 className="text-center text-lg font-semibold text-[#0F172A] md:text-3xl">
                Khu Phố
            </h2>
            <div className="w-full max-w-96">
                <div className="relative">
                    <select
                        className="ease h-12 w-full cursor-pointer appearance-none rounded-full border border-gray-200 bg-transparent px-4 text-sm text-gray-700 shadow-sm transition duration-300 placeholder:text-gray-400 hover:border-gray-400 focus:border-gray-400 focus:shadow-md focus:outline-none"
                        onChange={(e) => setAreaVal(e.target.value)}
                    >
                        <option defaultValue="">Chọn khu phố</option>
                        <option value="all">Tất cả</option>
                        {areas.map((item, index) => (
                            <option value={item.id} key={`khupho_${index}`}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                    <div className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-blue-900">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="m-1 h-6 w-6 text-white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <button
                type="button"
                className="cursor-pointer rounded-full bg-blue-900 px-6 py-2 text-sm text-white hover:bg-blue-950"
                onClick={() => navigate(`/${areaVal}`)}
            >
                Tìm kiếm
            </button>
        </div>
    );
}

function Detail({ areas }: { areas: IArea[] }) {
    return areas.length > 0 ? (
        areas.map((area, areaIndex) => (
            <div key={`khupho_${areaIndex}`} className="space-y-4">
                <div className="space-y-2 text-center text-[#0F172A]">
                    <h2 className="text-lg font-semibold md:text-3xl">
                        {area.name}
                    </h2>
                    {/* <p className="text-center">{area.address}</p> */}
                    <p className="text-center">
                        Đoạn từ: 100 - 200 đường Phạm Thế Hiển
                    </p>
                </div>
                <div className="space-y-2">
                    <h3 className="text-md text-center font-semibold text-[#0F172A] md:text-2xl">
                        Thành Viên
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {area.members.map((member, memberIndex) => (
                            <div
                                key={`thanhvien_${memberIndex}`}
                                className={`flex items-center gap-4 rounded-3xl border border-[#E2E8F0] p-4 shadow-lg ${(memberIndex == 0 && 'md:col-start-1 lg:col-start-2') || (memberIndex == 1 && 'md:col-start-2 lg:col-start-1')}`}
                            >
                                <img
                                    className="w-20"
                                    src={
                                        member.isAdmin
                                            ? member.isMale
                                                ? UserAdminMen
                                                : UserAdminWomen
                                            : User
                                    }
                                    alt="Hình biểu tượng người dùng"
                                />
                                <div className="space-y-2">
                                    <h4 className="text-md font-semibold text-blue-900 md:text-xl">
                                        {member.name}
                                    </h4>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="size-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                                            />
                                        </svg>
                                        <p>{member.role}</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="size-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                                            />
                                        </svg>
                                        <p>{member.phone}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ))
    ) : (
        <div className="my-32 flex flex-col items-center justify-center gap-4">
            <img
                src={EmptyBox}
                className="w-32"
                alt="Hình ảnh thùng hàng trống"
            />
            <p className="text-center">Không tìm thấy dữ liệu.</p>
        </div>
    );
}
