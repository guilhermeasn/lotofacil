export type LoadingProps = {
    variant ?: 'light' | 'dark' | 'default';
    text    ?: string;
}

export default function Loading({ variant = 'default', text = '' } : LoadingProps) : JSX.Element {

    return (

        <div className='lds-root'>

            <div className={ 'lds-grid ' + variant }>
                <div /><div /><div />
                <div /><div /><div />
                <div /><div /><div />
            </div>

            { text && (
                <p className={ 'lds-text ' + variant }>
                    { text }
                </p>
            ) }

        </div>

    );

}
