

export default function CatalogOverview({ catalog }) {
    console.log('catalog:', catalog);

    return (
        <div>
            <h1>{catalog?.name}</h1>
            { catalog?.isPrivate ? <p>private</p> : null }
            { catalog?.comment ? <p>{catalog.comment}</p> : null }

            {/* img */}
            {/* date created/updated */}
            {/* upvotes/downvotes */}

            {/* todo: sort items */}
            <div id="catalog-items">
                {catalog?.items?.map((item) => (
                    <CatalogItem item={item} />
                ))}
            </div>
        </div>
    )
};


function CatalogItem({ item }) {
    const dataType = item?.motif_data?.data_type;
    const itemData = item?.motif_data?.[dataType];

    console.log('catalog item:', item);

    return (
        <div>
            <img src={itemData?.image_url} height="115px" width="115px" />
            <h2>{itemData?.title}</h2>
            <p>{dataType}</p>
            <p>comment: {item?.comment}</p>
            <p>position: {item?.position}</p>
        </div>
    )
};

