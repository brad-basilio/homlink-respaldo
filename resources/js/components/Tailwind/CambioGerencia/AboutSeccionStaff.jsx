import React from "react";

const staff = [
    {
        name: "Juan Danon",
        role: "Fundador & CEO",
        image: "/assets/cambiogerencia/staff1.jpg",
        linkedin: "#"
    },
    {
        name: "Marta Cortés",
        role: "Técnica",
        image: "/assets/cambiogerencia/staff2.jpg",
        linkedin: "#"
    },
    {
        name: "Mia Man",
        role: "Admin. de oficina",
        image: "/assets/cambiogerencia/staff3.jpg",
        linkedin: "#"
    },
    {
        name: "Lisa Rose",
        role: "Admin. de producto",
        image: "/assets/cambiogerencia/staff4.jpg",
        linkedin: "#"
    },
    {
        name: "Juan Tom Valdez",
        role: "RRHH",
        image: "/assets/cambiogerencia/staff5.jpg",
        linkedin: "#"
    },
    {
        name: "Ale Gomez",
        role: "Asistente de Atención al Cliente",
        image: "/assets/cambiogerencia/staff6.jpg",
        linkedin: "#"
    },
    {
        name: "Mia Man",
        role: "Admin. de oficina",
        image: "/assets/cambiogerencia/staff7.jpg",
        linkedin: "#"
    },
];

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

const AboutSeccionStaff = () => {
    const staffRows = getStaffRows(staff);
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
                        {row.map((person, idx) => (
                            <div key={idx} className=" rounded-xl overflow-hidden  group flex flex-col">
                                <img
                                    src={person.image}
                                    alt={person.name}
                                    className="w-full  rounded-xl aspect-[14/16] object-cover"
                                />
                                <div className="flex-1 flex flex-col justify-between p-5">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-neutral text-2xl font-medium">{person.name}</span>
                                            <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="ml-auto">
                                                <IconLinkedin />
                                            </a>
                                        </div>
                                        <span className="text-neutral-dark text-xs">{person.role}</span>
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
