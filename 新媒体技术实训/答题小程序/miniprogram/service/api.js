const BASE_URL = 'http://localhost:3000/api';
module.exports = {
    LOGIN: `${BASE_URL}/user/loginGetToken`,

    GETALLUSER: `${BASE_URL}/user/searchUser`,
    SAVEUSER: `${BASE_URL}/user/saveUser`,
    REGISTERUSER: `${BASE_URL}/user/registerUser`,
    DELETEUSER: `${BASE_URL}/user/deleteUser`,
    UPDATEUSER: `${BASE_URL}/user/updateUser`,
    GETUSERINFOBYID: `${BASE_URL}/user/userInfo`,

    GETALLROLES: `${BASE_URL}/role/getAllRoles`,
    SAVEROLE: `${BASE_URL}/role/saveRole`,
    DELETEROLE: `${BASE_URL}/role/deleteRole`,
    UPDATEROLE: `${BASE_URL}/role/updateRole`,

    SAVESCORE: `${BASE_URL}/score/saveScore`,
    DELETESCORE: `${BASE_URL}/score/deleteScore`,
    GETSCORELIST: `${BASE_URL}/score/getScoreList`,

    GETALLRELATIONS: `${BASE_URL}/relation/getAllRelations`,
    ADDRELATION: `${BASE_URL}/relation/addRelation`,
    DELETERELATION: `${BASE_URL}/relation/deleteRelation`
}