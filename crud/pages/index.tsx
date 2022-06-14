import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import { prisma } from "../lib/prisma";

interface Users {
  users: {
    id: string;
    firstName: string;
    lastName: string;
    bio: string;
  }[];
}
interface FormData {
  id: string;
  firstName: string;
  lastName: string;
  bio: string;
}

const Home = ({ users }: Users) => {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    id: "",
    firstName: "",
    lastName: "",
    bio: "",
  });

  const refreshPage = () => {
    router.replace(router.asPath);
  };

  const createUser = async (data: FormData) => {
    try {
      fetch("http://localhost:3000/api/createUser", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => {
        if (data.id) {
          deleteUser(data.id);
          setForm({
            id: "",
            firstName: "",
            lastName: "",
            bio: "",
          });
          refreshPage();
        } else {
          setForm({
            id: "",
            firstName: "",
            lastName: "",
            bio: "",
          });
          refreshPage();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      fetch(`http://localhost:3000/api/user/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }).then(() => {
        refreshPage();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const HandleSubmit = async (data: FormData) => {
    try {
      createUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-center font-bold text-2xl mt-4">User Date</h1>

      <form
        className="flex flex-col items-stretch w-auto min-w-[25%] max-w-min mx-auto space-y-6 "
        onSubmit={(event) => {
          event.preventDefault();
          HandleSubmit(form);
        }}
      >
        <input
          className="rounded p-2 border-2 border-gray-600"
          type="text"
          placeholder="Name"
          name=""
          id=""
          value={form.firstName}
          onChange={(event) =>
            setForm({ ...form, firstName: event.target.value })
          }
        />
        <input
          className="rounded p-2 border-2 border-gray-600"
          type="text"
          placeholder="Name"
          name=""
          id=""
          value={form.lastName}
          onChange={(event) =>
            setForm({ ...form, lastName: event.target.value })
          }
        />
        <textarea
          className="rounded p-2 border-2 border-gray-600"
          placeholder="Bio"
          name=""
          id=""
          value={form.bio}
          onChange={(event) => setForm({ ...form, bio: event.target.value })}
        />

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded"
          type="submit"
        >
          Add +
        </button>
      </form>
      <div className="w-auto min-w-[25%] max-w-min mt-20 mx-auto space-y-6 flex flex-col items-stretch">
        <ul>
          {users.map((user) => (
            <li className="border-b border-gray-600 p-2" key={user.id}>
              <div className="flex justify-between ">
                <div className="flex-1">
                  <h2 className="font-bold">{user.lastName}</h2>
                  <h3 className="">{user.firstName}</h3>
                  <p className="text-sm">{user.bio}</p>
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 rounded"
                  onClick={() =>
                    setForm({
                      firstName: user.firstName,
                      lastName: user.lastName,
                      bio: user.bio,
                      id: user.id,
                    })
                  }
                >
                  update
                </button>
                <button
                  className="bg-red-500 px-3 text-white rounded"
                  onClick={() => deleteUser(user.id)}
                >
                  x
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      bio: true,
    },
  });
  return {
    props: {
      users: res,
    },
  };
};
