<script>
  // @ts-nocheck

  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import axios from "axios";
  import useFetch from "../../utils/fetch";
  import Slider from "./components/Slider.svelte";

  const endpoint = "http://localhost:4000/user";
  const [data, loading, error, get] = useFetch(endpoint);

  let show = false;
  let user = {};

  onMount(() => get());

  const save = () => {
    console.log(user.id);

    if (user.id != undefined) {
      axios.patch(endpoint + `/${user.id}`, user).then((res) => {
        get();
        user = {};
        show = false;
      });
    } else {
      axios.post(endpoint, user).then((res) => {
        get();
        user = {};
        show = false;
      });
    }
  };

  const edit = (u) => {
    show = true;
    user = {
      id: u.id,
      name: u.name,
      age: u.age,
      address: u.address,
    };
  };

  const remove = (u) => {
    axios.delete(endpoint + `/${u.id}`).then((res) => {
      get();
    });
  };
</script>

<Slider />

<section class="py-5">
  <div id="app" class="container pt-3">
    <div class="d-flex justify-content-between">
      <h2>User Card</h2>
      {#if show == false}
        <button
          type="button"
          class="btn btn-primary"
          on:click={() => (show = true)}>Add</button
        >
      {:else}
        <button
          type="button"
          class="btn btn-danger px-4"
          on:click={() => (show = false)}><i class="bi bi-x-lg" /></button
        >
      {/if}
    </div>
    <hr />

    {#if show}
      <form
        class="container"
        on:submit|preventDefault={save}
        in:fly={{ y: -10 }}
      >
        <input type="text" bind:value={user.id} hidden />
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            aria-describedby="name"
            placeholder="Enter name"
            bind:value={user.name}
            required
          />
        </div>
        <div class="form-group">
          <label for="age">Age</label>
          <input
            type="number"
            class="form-control"
            id="age"
            placeholder="Age"
            bind:value={user.age}
            required
          />
        </div>
        <div class="form-group mb-2">
          <label for="address">Address</label>
          <textarea
            class="form-control"
            placeholder="address..."
            id="address"
            style="height: 100px"
            bind:value={user.address}
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      <hr />
    {/if}

    <div class="d-flex flex-wrap justify-content-center gap-5">
      {#if $loading}
        <div v-if="loading">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      {:else if $error}
        <div class="alert alert-danger" role="alert">Error!!!</div>
      {:else}
        {#each $data as u, i}
          <div class="card" style="width: 18rem;">
            <img
              src="https://images.freeimages.com/images/large-previews/b44/fire-dancing-1174205.jpg"
              class="card-img-top"
              alt=""
            />
            <div class="card-body">
              <h5 class="card-title">{`${i + 1}. ${u.name}`}</h5>
              <p class="card-title">{`age: ${u.age}`}</p>
              <p class="card-text">
                Address: {u.address}
              </p>
              <button href="/" class="btn btn-primary" on:click={edit(u)}
                >Edit</button
              >
              <button href="/" class="btn btn-danger" on:click={remove(u)}
                >Delete</button
              >
            </div>
          </div>
        {/each}
      {/if}
    </div>
  </div>
</section>

<style>
  img {
    height: 200px;
  }
  form {
    width: 300px;
  }
</style>
