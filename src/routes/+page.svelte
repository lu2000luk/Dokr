<script>

</script>

<svelte:head>
    <title>Dokr - Dockerfile GUI builder</title>
</svelte:head>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<main class="w-full h-full p-12 bg-background text-text">
    <p class="title text-8xl font-bold tracking-wide shadow-lg" style="
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        background-image: url('../../../../fluid.svg');
    ">
        Dokr
    </p>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <p class="mt-1">A simple <span onclick={() => {
        window.open("https://docs.docker.com/reference/dockerfile/", "_blank")
    }} class="px-2 mx-1 hover:px-3 hover:mx-0 transition-all duration-200 py-1 rounded bg-[#0f1013] text-[#059669] font-semibold shadow-md cursor-pointer">Dockerfile</span> builder</p>
</main>