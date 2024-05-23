const AdminSection = ({title = "", description = "", subDescription = "", buttonName = null}) => {
    return (
        <div className="container bg-white w-[95%] m-5 shadow rounded text-sm">
            <section className={`p-3 px-5 ${title == 'Application Avatar' ? 'flex items-center justify-between' : ''}`}>
                <section>
                    <p className="text-lg font-semibold my-2">{title}</p>
                    <p>{description}</p>
                </section>

                {/* Only for Name */}
                {title == 'Application Name' && <input
                    type="text"
                    value="Demo"
                    className="w-[40%] outline-none border-black border-opacity-10 border-[1px] bg-gray-100 shadow p-2 px-4 rounded-md my-3" 
                />}

                {/* Only for Avatar */}
                {title == 'Application Avatar' &&
                    <img src="./leo.png" alt="Application Image" className="rounded-full w-14 h-14 shadow ring-1 ring-black mr-5" />
                }
            </section>
            <section className="bg-gray-200 p-3 px-5 flex items-center justify-between text-sm">
                <p>{subDescription}</p>
                {buttonName && 
                    <button className="bg-black text-white px-3 py-1 rounded">{buttonName}</button>
                }
            </section>
        </div>
    )
}

export default function AdminMenu() {
    return (
        <div className="bg-gray-200 rounded-md shadow ml-5 overflow-y-auto p-1 w-full">
            <AdminSection 
                title="Application Name" 
                description="This is your team's visible name. For example, the name of your company or department."
                subDescription="Please use 8 characters at maximum."
                buttonName="Save"
            />

            <AdminSection 
                title="Application Avatar" 
                description="This is your team's avatar, Click on the avatar to upload a custom one from your files.."
                subDescription="Please use below 1mb for Optimization."
            />
            <AdminSection 
                title="Reset Application" 
                description="This will clear all data from the Players and Team Details from Database."
                subDescription="Warning! Proceed with caution."
                buttonName="Reset"
            />
            <AdminSection 
                title="Reset Id's" 
                description="This will reset the Primary Key Id in all the tables."
                subDescription="Warning! Proceed with caution."
                buttonName="Reset"
            />
            <AdminSection 
                title="Move to Local" 
                description="This will move the Images to local Repo."
                subDescription="Check Firebase Bandwidh before Moving."
                buttonName="Move"
            />
        </div>
    )
}