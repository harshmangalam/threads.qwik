import { component$ } from "@builder.io/qwik";
import { Form, useLocation } from "@builder.io/qwik-city";
import SearchIcon from "~/assets/icons/search.svg?jsx";
export const SearchForm = component$(() => {
  const location = useLocation();
  const defaultValue = location.url.searchParams.get("q");
  return (
    <Form class="join flex items-center">
      <input
        type="search"
        name="q"
        class="input join-item input-bordered w-full"
        placeholder="Search"
        value={defaultValue}
      />
      <button class="btn join-item">
        <SearchIcon class="h-6 w-6" />
      </button>
    </Form>
  );
});
