

    const Paginator = ({ total, curr }: {total: number, curr: number}) => {

    return (
        <div className="h-full w-full flex items-center justify-center gap-2">
            {
                Array.from({ length: total }, (_, index) => (
                    <div 
                    key={index}
                    className={`h-[12px] rounded-sm ${index + 1 === curr ? 'w-[26px] bg-white' : 'w-[16px] bg-[#575e66]'} hover:cursor-pointer`}>
                    </div>
                ))
            }
        </div>
    )
}

export default Paginator;