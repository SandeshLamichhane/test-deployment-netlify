import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SideBarData = [
    {
        title: "News",
        icon: <AiIcons.AiFillHome />,
        path: "/",
        cName: 'nav-text'
    },
    {
        title: "Users",
        icon: <IoIcons.IoIosAlarm />,
        path: "/reports",
        cName: 'nav-text'
    },

    {
        title: "Team",
        icon: <IoIcons.IoIosGitMerge />,
        path: "/team",
        cName: 'nav-text'
    },
    {
        title: "Sahayog",
        icon: <FaIcons.FaCalculator />,
        path: "/sahayog",
        cName: 'nav-text'
    },


]
