import SideBars from "@/components/SideBars";


export default function PublicLayout({
    children
},
) {
    return (
        <>
        <SideBars/>
            <div>
                {children}
            </div>
        </>
    );
}
