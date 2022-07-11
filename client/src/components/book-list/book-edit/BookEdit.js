export const BookEdit = ({
    book,   
}) => {
      return (
        <form>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="firstName">First name</label>
                    <div className="input-wrapper">
                        <span><i className="fa-solid fa-user"></i></span>
                        <input id="firstName" name="firstName" type="text" defaultValue={book.bookName} />
                    </div>
                    <p className="form-error">
                        First name should be at least 3 characters long!
                    </p>
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last name</label>
                    <div className="input-wrapper">
                        <span><i className="fa-solid fa-user"></i></span>
                        <input id="lastName" name="lastName" type="text" />
                    </div>
                    <p className="form-error">
                        Last name should be at least 3 characters long!
                    </p>
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <div className="input-wrapper">
                        <span><i className="fa-solid fa-envelope"></i></span>
                        <input id="email" name="email" type="text" />
                    </div>
                    <p className="form-error">Email is not valid!</p>
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone number</label>
                    <div className="input-wrapper">
                        <span><i className="fa-solid fa-phone"></i></span>
                        <input id="phoneNumber" name="phoneNumber" type="text" />
                    </div>
                    <p className="form-error">Phone number is not valid!</p>
                </div>
            </div>

            <div className="form-group long-line">
                <label htmlFor="imageUrl">Image Url</label>
                <div className="input-wrapper">
                    <span><i className="fa-solid fa-image"></i></span>
                    <input id="imageUrl" name="imageUrl" type="text" />
                </div>
                <p className="form-error">ImageUrl is not valid!</p>
            </div>
            <div id="form-actions">
                <button id="action-save" className="btn" type="submit">Edit</button>
                {/* <button id="action-cancel" className="btn" type="button" onClick={onClose}>
                    Cancel
                </button> */}
            </div>
        </form>
    )

}