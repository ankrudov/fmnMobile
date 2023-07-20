//User is a type for creating a users account
export type  User = {
    username: string;
    first_name: string;
    last_name: string;
    password: string;
    email: string;
    phone_number: string;
    is_staff: boolean;
    is_active: boolean;
    is_superuser: boolean;
};

//UserCredentials is a type for any service that may need just the username and password 
export type UserCredentials = Pick<User, 'username' | 'password'>;
