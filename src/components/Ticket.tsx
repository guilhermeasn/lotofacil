export type TicketProps = {
    variant ?: 'success' | 'primary' | 'danger' | 'warning';
    actives ?: number[];
    onClick ?: (num : number) => void;
}

export default function Ticket({ variant = 'success', actives, onClick } : TicketProps) {

    return (

        <div>

            { Array(5).fill(5).map((v, k) => (

                <div key={ k } className="d-flex justify-content-center">

                    { Array(5).fill(k*v+1).map((v, k) => {

                        const num : number = k + v;
                        const hit : boolean = actives?.some(active => active === num) ?? false;

                        return (
                            <div
                                key={ num }
                                className={ [
                                    "border m-1 p-3 h5 rounded-5",
                                    hit ? `bg-${variant}-subtle border-${variant} text-${variant}` : 'text-muted user-select-none',
                                    typeof onClick === 'function' ? 'clickable' : ''
                                ].join(' ') }
                                onClick={ typeof onClick === 'function' ? () => onClick(num) : undefined }
                            >
                                { (num < 10 ? '0' : '') + num.toString() }
                            </div>
                        );

                    }) }

                </div>

            )) }

        </div>

    )

}