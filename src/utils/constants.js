export const registration = {
    inputColumns: [
        {
            label: 'Player Name',
            type: 'text',
            name: 'name',
            required: true,
        },
        {
            label: 'Date of Birth (DD-MM-YYYY)',
            type: 'text',
            name: 'dob',
            required: true,
        },
        { label: 'Age', type: 'number', name: 'age', required: true },
        {
            label: 'Contact Number',
            type: 'number',
            name: 'contact_number',
            required: true,
        },
        {
            label: 'Team Name',
            type: 'text',
            name: 'team_name',
            required: true,
        },
        { label: 'Area', type: 'text', name: 'area', required: true },
        {
            label: 'Jersey Name',
            type: 'text',
            name: 'jersey_name',
            required: true,
        },
        {
            label: 'Jersey No',
            type: 'number',
            name: 'jersey_no',
            required: true,
        },
    ],
    selectColumns: [
        {
            label: 'Jersey Size',
            name: 'jersey_size',
            options: ['Small', 'Medium', 'Large', 'Extra Large(XL)', 'XXL', 'XXXL'],
            required: true,
        },
        {
            label: 'Player Role',
            name: 'player_role',
            options: ['All Rounder', 'Batsman', 'Bowler'],
            required: true,
        },
        {
            label: 'Batting Style',
            name: 'batting_style',
            options: ['N/A', 'Right', 'Left'],
        },
        {
            label: 'Bowling Style',
            name: 'bowling_style',
            options: ['N/A', 'Fast', 'Medium', 'Spin'],
        },
    ],
};

export const newTeamPlayer = {
    inputColumns: [
        {
            label: 'Team Name',
            name: 'team_name',
            type: 'text',
            disabled: true,
        },
        {
            label: 'Player No',
            name: 'player_no',
            type: 'text',
            required: true,
        },
        {
            label: 'Player Name',
            name: 'player_name',
            type: 'text',
            required: true,
        },
        {
            label: 'Points',
            name: 'points',
            type: 'number',
            required: true,
        },
    ],
};

export const newTeam = {
    inputColumns: [
        { label: 'Team Name', type: 'text', required: true, name: 'team_name' },
        { label: 'Captain Name', type: 'text', required: true, name: 'captain' },
        { label: 'Owner Name', type: 'text', required: true, name: 'owner' },
        { label: 'Slots', type: 'text', name: 'slots', disabled: true },
        { label: 'Remaining Slots', type: 'text', name: 'remaining_slots', disabled: true },
        { label: 'Total Points Available', type: 'text', name: 'total_points_available', disabled: true },
        { label: 'Remaining Points Available', type: 'text', name: 'remaining_points_available', disabled: true },
    ],
    fileUploadInputs: [
        { label: 'Team Photo', type: 'file', required: false, name: 'team_photo' },
        { label: 'Captain Photo', type: 'file', required: false, name: 'captain_photo' },
        { label: 'Owner Photo', type: 'file', required: false, name: 'owner_photo' },
    ],
};

export const mockTableData = {
    team_name: '',
    captain: '',
    owner: '',
    slots: '',
    remaining_slots: '',
    total_points_available: '',
    remaining_points_available: '',
    team_photo: '',
    owner_photo: '',
    captain_photo: '',
};

export const mockTeamTableData = {
    id: '',
    name: '',
    contact_number: '',
    jersey_name: '',
    jersey_size: '',
    jersey_no: '',
    team_name: '',
    owner: '',
};

export const TEAM_DASHBOARD_ROWS = [
    'Team Name',
    'Captain',
    'Owner',
    'Slots',
    'Remaining Slots',
    'Total Points',
    'Remaining Pts',
    'Actions',
];

export const TEAM_TABLE_ROWS = ['Player Id', 'Player Name', 'Contact No', 'Jersey Name', 'Jersey Size', 'Jersey No'];

export const SIDEBAR_MENUS = [
    { name: 'Dashboard', icon: 'HomeModernIcon' },
    { name: 'Players', icon: 'UserGroupIcon' },
    { name: 'Admin', icon: 'CogIcon' },
];
