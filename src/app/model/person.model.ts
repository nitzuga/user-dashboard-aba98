export interface Person {
    /**
     * @description
     * Identification number used in Chile, with valid verification digit. Required.
     */
    rut: string; // valid rut with verification digit, required

    /**
     * @description
     * First name of the person. Max 50 characters. Required.
     */
    name: string; // max 50 char, required

    /**
     * @description
     * Last name of the person. Max 60 characters. Required
     */
    lastname: string; // max 60 char, required

    /**
     * @description
     * Age of the person. Must be over 18.
     */
    age?: number; // > 18

    /**
     * @description
     * Max 400 characters. Multiline.
     */
    address?: string; // max 400 char, multiline

    // timestamps
    createdAt?: any;
    updatedAt?: any;
}
