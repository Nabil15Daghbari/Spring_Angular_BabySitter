
export const MENU = {
    adminMenu: [
      

        {
            id: 1,
            label: 'Compte Parent',
            link: 'users/parent',

        },    
        {
            id: 2,
            label: 'Compte BabySitter',
            link: 'users/babySitter',  

        },    
        {
            id: 3,
            label: 'Announcement',
            link: 'announcement_admin',

        },    
        {
            id: 3,
            label: 'Demandes acceptées',
            link: 'demandes/demande_accepte',

        },     
       
    ],

    
    Parent: [
        {
            id: 1,
            label: "Enfant",
            link: 'users/enfant', 

        },

        {
            id: 2,
            label: "Announcement",
            link: 'announcement_parent', 

        },
        {
            id: 3,
            label: "Offre BabySitter",
            link: 'offre_babysitter',

        },
        {
            id: 4,
            label: "les demandes",
            link: 'demandes/demande_babysitter',

        },
    
       

    ],
    Babysitter: [
      
        {
            id: 2,
            label: "Announcement",
            link: 'announcement_babysitter',

        },

        {
            id: 2,
            label: "Offre Parent",
            link: 'offre_parent',

        },

        {
            id: 3,
            label: "Suivi demande",
            link: 'demandes/suivi_demande',

        },
        
        

    ],

   
};
