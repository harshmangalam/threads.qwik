import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import SearchIcon from "~/assets/icons/search.svg?jsx";
export const SearchForm = component$(() => {
  return (
    <Form class="join flex items-center">
      <input
        type="search"
        name="q"
        class="input join-item input-bordered w-full"
        placeholder="Search"
      />
      <button class="btn join-item">
        <SearchIcon class="h-6 w-6" />
      </button>
    </Form>
  );
});
