import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function Edit({ auth, contact }) {

    const initialValues = {
        name: contact.name,
        avatar: null,
        phone: contact.phone,
        visibility: contact.visibility,
    }
    const { data, setData, errors, post, recentlySuccessful } = useForm(initialValues)

    const submit = (e) => {
        e.preventDefault();
        post(route('contact.update',contact))
        console.log(data)
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex justify-between'>

                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Actualizar Contactos</h2>
                    <Link href={route('contact.create')}>Crear contacto</Link>
                </div>
            }
        >
            <Head title="Contactos" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit} className='space-y-4'>

                            <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-600 dark:text-gray-400 text-center">Saved.</p>
                    </Transition>

                                <div>
                                    <InputLabel htmlFor="name" value="Nombre" />

                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />

                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="phone" value="Telefono" />

                                    <TextInput
                                        id="phone"
                                        type="text"
                                        name="phone"
                                        value={data.phone}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('phone', e.target.value)}
                                    />

                                    <InputError message={errors.phone} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="avatar" value="avatar" />

                                    <TextInput
                                        id="avatar"
                                        type="file"
                                        name="avatar"
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('avatar', e.target.files[0])}
                                    />

                                    <InputError message={errors.avatar} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="visibility" value="visibility" />

                                    <select
                                        name="visibility"
                                        id=""
                                        defaultValue={contact.visibility}
                                        className="border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                        onChange={(e) => setData('visibility', e.target.value)}
                                    >
                                        <option value="public">publico</option>
                                        <option value="private">privado</option>
                                    </select>

                                    <InputError message={errors.visibility} className="mt-2" />
                                </div>

                                <div className="flex justify-center">
                                    <PrimaryButton >
                                    Actualizar contacto
                                    </PrimaryButton>
                                
                                    

                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}