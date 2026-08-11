type Props = {
    value: string,
    color: string
}



export function Badge ({value,color}:Props) {
    const style: string = "bg-transparent p-1 rounded-md border border-" + color
    const textcol: string = "text-" + color
    return (
        <div className={style}>
            <p className={textcol}>{value}</p>
        </div>
    )
}