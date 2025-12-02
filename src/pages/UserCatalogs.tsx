
export default function UserCatalogs({ catalogs=[] }) {

    return (
        <div className='user-catalogs'>
            <p>count: {catalogs?.length}</p>
        </div>
    );
};
