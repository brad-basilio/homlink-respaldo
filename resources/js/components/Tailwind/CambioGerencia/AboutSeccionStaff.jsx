import React from "react";





const AboutSeccionStaff = ({staff}) => {
const IconLinkedin = () => (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.33252 12.5C0.33252 5.87258 5.7051 0.5 12.3325 0.5C18.9599 0.5 24.3325 5.87258 24.3325 12.5C24.3325 19.1274 18.9599 24.5 12.3325 24.5C5.7051 24.5 0.33252 19.1274 0.33252 12.5ZM6.48252 10.475V18.5H9.03252V10.475H6.48252ZM6.33252 7.925C6.33252 8.75 6.93252 9.35 7.75752 9.35C8.58252 9.35 9.18252 8.75 9.18252 7.925C9.18252 7.1 8.58252 6.5 7.75752 6.5C7.00752 6.5 6.33252 7.1 6.33252 7.925ZM15.7825 18.5H18.1825V13.55C18.1825 11.075 16.6825 10.25 15.2575 10.25C13.9825 10.25 13.0825 11.075 12.8575 11.6V10.475H10.4575V18.5H13.0075V14.225C13.0075 13.1 13.7575 12.5 14.5075 12.5C15.2575 12.5 15.7825 12.875 15.7825 14.15V18.5Z" fill="#D62828" />
    </svg>

);


function getStaffRows(staff) {
    const n = staff.length;
    if (n <= 4) {
        // 1-3: grid of n, 4: grid of 4
        return [staff];
    }
    if (n === 5) {
        return [staff.slice(0, 3), staff.slice(3, 5)];
    }
    if (n === 6) {
        return [staff.slice(0, 3), staff.slice(3, 6)];
    }
    if (n === 7) {
        return [staff.slice(0, 3), staff.slice(3, 7)];
    }
    if (n === 8) {
        return [staff.slice(0, 4), staff.slice(4, 8)];
    }
    // 9+: rows of 3
    const rows = [];
    for (let i = 0; i < n; i += 3) {
        rows.push(staff.slice(i, i + 3));
    }
    return rows;
}


    const staffRows = getStaffRows(staff);
    // Iconos para redes sociales
    const socialIcons = {
            linkedin: (
            <svg width="25" height="25" viewBox="0 0 25 25" fill="current" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.33252 12.5C0.33252 5.87258 5.7051 0.5 12.3325 0.5C18.9599 0.5 24.3325 5.87258 24.3325 12.5C24.3325 19.1274 18.9599 24.5 12.3325 24.5C5.7051 24.5 0.33252 19.1274 0.33252 12.5ZM6.48252 10.475V18.5H9.03252V10.475H6.48252ZM6.33252 7.925C6.33252 8.75 6.93252 9.35 7.75752 9.35C8.58252 9.35 9.18252 8.75 9.18252 7.925C9.18252 7.1 8.58252 6.5 7.75752 6.5C7.00752 6.5 6.33252 7.1 6.33252 7.925ZM15.7825 18.5H18.1825V13.55C18.1825 11.075 16.6825 10.25 15.2575 10.25C13.9825 10.25 13.0825 11.075 12.8575 11.6V10.475H10.4575V18.5H13.0075V14.225C13.0075 13.1 13.7575 12.5 14.5075 12.5C15.2575 12.5 15.7825 12.875 15.7825 14.15V18.5Z" fill="current" />
            </svg>
        ),
        facebook: (
            <svg width="25" height="25" viewBox="0 0 25 25" fill="current" xmlns="http://www.w3.org/2000/svg">
                <path d="M24.3325 12.5C24.3325 5.87258 18.9599 0.5 12.3325 0.5C5.7051 0.5 0.33252 5.87258 0.33252 12.5C0.33252 18.4915 4.78652 23.4362 10.5825 24.3672V16.0859H7.58252V12.5H10.5825V9.9375C10.5825 6.96094 12.4181 5.3125 15.0919 5.3125C16.3731 5.3125 17.7075 5.54688 17.7075 5.54688V8.45312H16.2931C14.8999 8.45312 14.5825 9.27344 14.5825 10.1172V12.5H17.5744L17.1175 16.0859H14.5825V24.3672C20.3785 23.4362 24.3325 18.4915 24.3325 12.5Z" fill="current"/>
                <path d="M17.1175 16.0859L17.5744 12.5H14.5825V10.1172C14.5825 9.27344 14.8999 8.45312 16.2931 8.45312H17.7075V5.54688C17.7075 5.54688 16.3731 5.3125 15.0919 5.3125C12.4181 5.3125 10.5825 6.96094 10.5825 9.9375V12.5H7.58252V16.0859H10.5825V24.3672C11.1585 24.4562 11.7451 24.5 12.3325 24.5C12.9199 24.5 13.5065 24.4562 14.0825 24.3672V16.0859H17.1175Z" fill="white"/>
            </svg>
        ),
        twitter: (
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24.3325 4.55705C23.4125 4.94805 22.4325 5.21305 21.4125 5.33205C22.4525 4.72305 23.2525 3.75805 23.6625 2.60705C22.6825 3.17205 21.5925 3.58205 20.4125 3.80705C19.4825 2.83705 18.1325 2.25005 16.6625 2.25005C13.8725 2.25005 11.6625 4.46005 11.6625 7.25005C11.6625 7.64105 11.7025 8.02105 11.7825 8.38705C7.72852 8.17705 4.10852 6.25705 1.68252 3.27705C1.25252 3.97705 1.00252 4.79705 1.00252 5.67205C1.00252 7.29705 1.87252 8.72305 3.16252 9.54705C2.31252 9.52705 1.50252 9.29705 0.78252 8.92705V8.98705C0.78252 11.357 2.39252 13.357 4.66252 13.797C4.28252 13.897 3.87252 13.947 3.44252 13.947C3.14252 13.947 2.85252 13.917 2.57252 13.857C3.16252 15.827 4.89252 17.247 6.98252 17.287C5.38252 18.577 3.35252 19.357 1.16252 19.357C0.77252 19.357 0.39252 19.337 0.0125198 19.297C2.12252 20.697 4.64252 21.5 7.33252 21.5C16.6525 21.5 21.6625 13.997 21.6625 7.80705C21.6625 7.59705 21.6625 7.38705 21.6525 7.17705C22.6425 6.45705 23.5025 5.57705 24.3325 4.55705Z" fill="current"/>
            </svg>
        ),
        instagram: (
            <svg width="25" height="25" viewBox="0 0 25 25" fill="current" xmlns="http://www.w3.org/2000/svg">
                <rect x="2.5" y="2.5" width="20" height="20" rx="5" fill="current"/>
                <circle cx="12.5" cy="12.5" r="5" fill="white"/>
                <circle cx="18.5" cy="6.5" r="1.5" fill="white"/>
            </svg>
        ),
        default: (
            <svg width="25" height="25" viewBox="0 0 25 25" fill="current" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12.5" cy="12.5" r="12" fill="current"/>
                <text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="Arial" dy=".3em">SOC</text>
            </svg>
        ),
    };

    // Detecta el tipo de red social por la url
    function getSocialType(url) {
        if (!url) return "default";
        if (url.includes("linkedin.com")) return "linkedin";
        if (url.includes("facebook.com")) return "facebook";
        if (url.includes("twitter.com") || url.includes("x.com")) return "twitter";
        if (url.includes("instagram.com")) return "instagram";
        return "default";
    }

    return (
        <section className="w-full bg-white px-[5%] py-20">
            <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <span>
                        <svg width="18" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.50225 0C5.95566 0 4.69727 1.2584 4.69727 2.80499C4.69727 4.35158 5.95566 5.60998 7.50225 5.60998C9.04885 5.60998 10.3072 4.35158 10.3072 2.80499C10.3072 1.2584 9.04885 0 7.50225 0Z" fill="#D62828" />
                            <path d="M7.50112 24.0025C3.65842 24.0025 0.759766 22.4639 0.759766 20.4219C0.759766 19.9629 1.13269 19.59 1.59168 19.59C2.05066 19.59 2.42359 19.9629 2.42359 20.4219C2.42359 21.203 4.40166 22.3387 7.49981 22.3387C10.5993 22.3387 12.576 21.2043 12.576 20.4219C12.576 19.8743 12.4874 19.3657 12.3048 18.8689C12.147 18.4373 12.3674 17.9601 12.799 17.801C13.2306 17.6432 13.7092 17.8636 13.8669 18.2952C14.1147 18.9693 14.2399 19.6839 14.2399 20.4206C14.2425 22.4639 11.3451 24.0025 7.50112 24.0025Z" fill="#D62828" />
                            <path d="M11.4896 21.804C12.3046 21.4414 12.7754 20.9968 12.8132 20.6225C5.70098 16.9581 5.32021 11.2634 5.32021 10.1015C5.32021 9.64249 4.94725 9.26953 4.48823 9.26953C4.02921 9.26953 3.65625 9.64249 3.65625 10.1015C3.65625 11.4082 4.06181 17.6884 11.4896 21.804Z" fill="#D62828" />
                            <path d="M7.49991 6.25781C5.37954 6.25781 3.6543 7.98306 3.6543 10.1034C3.6543 10.5624 4.02725 10.9354 4.48627 10.9354C4.9453 10.9354 5.31825 10.5624 5.31825 10.1034C5.31825 8.9011 6.29628 7.92177 7.49991 7.92177C8.70353 7.92177 9.68156 8.8998 9.68156 10.1034C9.68156 10.9432 8.14671 11.9108 6.66272 12.8458C6.33019 13.0558 5.98722 13.2709 5.64296 13.4965C5.81248 13.9855 6.03026 14.5059 6.31454 15.047C6.72531 14.7732 7.1426 14.5111 7.55077 14.2542C9.58768 12.971 11.3468 11.8626 11.3468 10.1034C11.3455 7.98306 9.62158 6.25781 7.49991 6.25781Z" fill="#D62828" />
                            <path d="M4.23503 14.4766C2.36765 15.8954 0.759766 17.7158 0.759766 20.4191C0.759766 20.8781 1.13272 21.251 1.59174 21.251C2.05076 21.251 2.42372 20.8781 2.42372 20.4191C2.42372 18.5465 3.53085 17.1707 4.95486 16.0271C4.66406 15.4937 4.42673 14.9734 4.23503 14.4766Z" fill="#D62828" />
                        </svg>
                    </span>
                    <h3 className="uppercase text-neutral-dark text-sm lg:text-lg font-bold">Nuestro equipo</h3>
                </div>

                <h2 className="text-[40px]  lg:text-[52px] font-medium mb-6 leading-tight italic">
                    Todo nuestro <span className="text-constrast italic font-normal">equipo</span>
                </h2>
            </div>
            <div className="flex flex-col gap-8 max-w-6xl mx-auto">
                {staffRows.map((row, rowIdx) => (
                    <div
                        key={rowIdx}
                        className={`grid gap-8 grid-cols-1 ${row.length === 1
                                ? 'lg:grid-cols-1'
                                : row.length === 2
                                    ? 'lg:grid-cols-2'
                                    : row.length === 4
                                        ? 'lg:grid-cols-4'
                                        : 'lg:grid-cols-3'
                            }`}
                    >
                        {row?.map((person, idx) => (
                            <div key={idx} className=" rounded-xl overflow-hidden  group flex flex-col">
                                <img
                                    src={`/api/staff/media/${person.image}`}
                                    alt={person.name}
                                    className="w-full  rounded-xl aspect-[14/16] object-cover"
                                />
                                <div className="flex-1 flex flex-col justify-between p-5">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-neutral text-2xl font-medium">{person.name}</span>
                                            <div className="flex gap-2 ml-auto ">
                                                {Array.isArray(person.socials) && person.socials.map((social, i) => {
                                                    const url = typeof social === "string" ? social : social?.value;
                                                    const type = getSocialType(url);
                                                    return url ? (
                                                        <a
                                                            key={i}
                                                            href={url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="fill-accent"
                                                            title={type.charAt(0).toUpperCase() + type.slice(1)}
                                                        >
                                                            {socialIcons[type] || socialIcons.default}
                                                        </a>
                                                    ) : null;
                                                })}
                                            </div>
                                        </div>
                                        <span className="text-neutral-dark text-xs">{person.job}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AboutSeccionStaff;
