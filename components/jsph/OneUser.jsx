export default function OneUser({ user }) {
    const
        {id, name, username, email,
        address: {street, suite, city, zipcode, geo: {lat, lng}},
        phone, website,
        company: {
            name: cname,
            catchPhrase,
            bs
        }
        } = user;

    return ( <>
            <fieldset className="user-card">
                <legend>#{id} {username}</legend>
                <h3>{name}</h3>
                <span>Email: <a href={`mailto:${email}`}>{email}</a></span><br/>
                <span>Phone: <a href={`tel:${phone}`}>{phone}</a></span><br/>
                <span>Website: <a href={`http://${website}`}>{website}</a></span><br/>
                <span title={zipcode}>Address: <a href={`https://maps.google.com/maps?ll=${lat},${lng}`}>{street}</a></span><br/>
                <span>Company: <b>{cname}</b><br />{catchPhrase}<br />{bs}</span>
            </fieldset>
        </>
    );
}