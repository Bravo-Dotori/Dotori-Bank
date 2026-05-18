export const login = async (user_id, password) => {
    const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
              'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            user_id,
            password,
        }),
    });


    if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }
    return await response.json();
    
}