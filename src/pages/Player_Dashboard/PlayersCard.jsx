/* eslint-disable no-restricted-globals */
import { useState } from 'react';
import Icon from '../../commonComponents/Icon';
import { fetchAPI } from '../../utils/commonServices';
import toast from 'react-hot-toast';
import PlayerRegistration from '../Player_Registeration/PlayerRegistration';

function TextField({ title, value, icon }) {
    return (
        <section className="my-1 flex items-center justify-center">
            <span className="mx-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                <Icon icon={icon} size={5} outline />
            </span>

            <div className="text-sm text-gray-600">
                {title}
                <p className="font-semibold">{value}</p>
            </div>
        </section>
    );
}

export default function PlayersCard({ name, contact, role, team, image, id, fromRegisterMenu = false, onClick, playerData }) {
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);

    async function handleDelete() {
        const confirmation = confirm('Do you want to delete this player?');
        if (confirmation) {
            setIsButtonLoading(true);
            try {
                await fetchAPI(`/player/delete/${id}`, 'PUT');
                window.location.reload();
            } catch (error) {
                toast.error('Unable to Delete the Player.');
            }
            setIsButtonLoading(false);
        }
    }

    return (
        <main className="relative flex w-full items-center rounded-lg bg-white p-3 shadow">
            <img
                src={image}
                alt="Rounded avatar"
                loading="eager"
                className={`col-span-1 mx-5 mr-7 h-36 w-36 rounded-full object-cover p-0.5 shadow-md ring-1 ring-gray-200`}
                onClick={onClick}
            />
            <div className="flex flex-col items-start" onClick={onClick}>
                <section className="mb-2 text-lg font-semibold capitalize text-gray-600">
                    {name.length > 12 ? name.slice(0, 12) + '..' : name}
                </section>
                <TextField title="Phone" value={contact} icon="PhoneIcon" />
                <TextField title="Role" value={role} icon="AcademicCapIcon" />
                <TextField title="Team" value={team} icon="UserGroupIcon" />
            </div>

            {/* Delete Icon */}
            {!isButtonLoading ? (
                <Icon
                    icon="ArchiveBoxXMarkIcon"
                    size={4}
                    outline
                    className={`absolute right-2 top-3 text-red-600 ${fromRegisterMenu ? 'hidden' : ''}`}
                    onClick={() => handleDelete()}
                />
            ) : (
                <img src="/loading.gif" alt="Loading" className="absolute right-3 top-3 w-5" />
            )}
            {/* Edit Button */}
            <Icon
                icon="PencilSquareIcon"
                size={4}
                outline
                className={`absolute right-9 top-3 text-green-700 ${fromRegisterMenu ? 'hidden' : ''}`}
                onClick={(e) => {
                    e.preventDefault();
                    setEditMode(true);
                }}
            />
            {/* Edit Page */}
            {editMode && (
                <div className="fixed left-0 top-0 z-50 h-screen w-screen overflow-y-scroll">
                    <PlayerRegistration editData={playerData} closeModal={() => setEditMode(false)} />
                </div>
            )}
        </main>
    );
}
