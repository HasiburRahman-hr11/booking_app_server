import auth from '../routes/auth.js';
import users from '../routes/users.js';
import rooms from '../routes/rooms.js';
import hotels from '../routes/hotels.js';

const routes = [
    {
        handler: auth,
        path: '/api/auth'
    },
    {
        handler: users,
        path: '/api/users'
    },
    {
        handler: rooms,
        path: '/api/rooms'
    },
    {
        handler: hotels,
        path: '/api/hotels'
    },
]

const useRoutes = (app) => {
    routes.map(route => {
        app.use(route.path, route.handler)
    })
}

export default useRoutes;