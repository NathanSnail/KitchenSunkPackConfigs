// priority: 0

// Visit the wiki for more info - https://kubejs.com/

console.info("Hello, World! (Loaded server scripts)");

const tome = Item.of(
    "akashictome:tome",
    '{"akashictome:data":{ae2:{Count:1b,id:"ae2:guide"},alexscaves:{Count:1b,id:"alexscaves:cave_book",tag:{"akashictome:displayName":{text:\'{"translate":"item.alexscaves.cave_book"}\'},"akashictome:is_morphing":1b,display:{Name:\'{"translate":"akashictome.sudo_name","with":[{"color":"green","translate":"item.alexscaves.cave_book"}]}\'}}},alexsmobs:{Count:1b,id:"alexsmobs:animal_dictionary"},botania:{Count:1b,id:"botania:lexicon"},eidolon:{Count:1b,id:"eidolon:codex"},hexcasting:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"hexcasting:thehexbook"}},hexerei:{Count:1b,id:"hexerei:book_of_shadows",tag:{bookmarks:{},chapter:0,opened:0b,page:0}},irons_spellbooks:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"irons_spellbooks:iss_guide_book"}},malum:{Count:1b,id:"malum:encyclopedia_arcana"},mca:{Count:1b,id:"mca:book_death"},mca_0:{Count:1b,id:"mca:book_romance",tag:{"akashictome:definedMod":"mca_0"}},mca_1:{Count:1b,id:"mca:book_infection",tag:{"akashictome:definedMod":"mca_1"}},mca_2:{Count:1b,id:"mca:book_rose_gold",tag:{"akashictome:definedMod":"mca_2"}},mca_3:{Count:1b,id:"mca:book_blueprint",tag:{"akashictome:definedMod":"mca_3"}},mca_4:{Count:1b,id:"mca:book_family",tag:{"akashictome:definedMod":"mca_4"}},mca_5:{Count:1b,id:"mca:book_supporters",tag:{"akashictome:definedMod":"mca_5"}},spectrum:{Count:1b,id:"spectrum:guidebook"},tetra:{Count:1b,id:"tetra:holo",tag:{"akashictome:displayName":{text:\'{"text":"Holosphere"}\'},"akashictome:is_morphing":1b,display:{Name:\'{"translate":"akashictome.sudo_name","with":[{"color":"green","text":"Holosphere"}]}\'},"holo/core":"holo/core","holo/core_material":"frame/dim","holo/frame":"holo/frame","holo/frame_material":"core/ancient","holo/repo":"holo/repo","holo/repo_material":"repo/default","holo/scanner":"holo/scanner","holo/scanner_material":"scanner/default"}}},"akashictome:is_morphing":1b}'
);

ServerEvents.recipes((event) => {
    function pedestal(
        time,
        tier,
        result,
        pigments,
        experience,
        pattern,
        key,
        required_advancement,
        id
    ) {
        let key_formatted = {};
        for (let [k, v] of Object.entries(key)) {
            key_formatted[k] = { item: v };
        }
        let obj = {
            type: "spectrum:pedestal",
            time: time,
            tier: tier,
            experience: experience,
            pattern: pattern,
            key: key_formatted,
            result: { item: result.id, count: result.count },
            required_advancement: required_advancement,
        };
        for (let [k, v] of Object.entries(pigments)) {
            obj[k] = v;
        }
        event.custom(obj).id(id);
    }

    event.remove({ output: "spectrum:amethyst_storage_block" });
    event
        .shaped(
            Item.of("spectrum:amethyst_storage_block", 1), // arg 1: output
            [
                "AAA",
                "ACA", // arg 2: the shape (array of strings)
                "AAA",
            ],
            {
                A: "minecraft:amethyst_shard",
                C: "hexcasting:charged_amethyst",
            }
        )
        .id("spectrum:crafting_table/gem_blocks/amethyst_storage_block");
    event.remove({ id: "spectrum:pedestal/tier3/liquid_crystal_bucket" });
    pedestal(
        240,
        "advanced",
        Item.of("spectrum:liquid_crystal_bucket", 1),
        {
            magenta: 1,
            yellow: 1,
            cyan: 1,
            black: 1,
            white: 0,
        },
        1,
        ["PMP", "SBS", "YHY"],
        {
            P: "spectrum:pink_pigment",
            Y: "spectrum:yellow_pigment",
            B: "minecraft:bucket",
            S: "spectrum:shimmerstone_gem",
            M: "spectrum:mermaids_gem",
            H: "immersive_weathering:hexcasting/edified_bark",
        },
        "spectrum:unlocks/equipment/omni_accelerator",
        "spectrum:pedestal/tier3/liquid_crystal_bucket"
    );
    event.remove({ id: "spectrum:pedestal/tier3/bottle_of_ruin" });
    pedestal(
        1200,
        "advanced",
        Item.of("spectrum:bottle_of_ruin", 1),
        {
            magenta: 4,
            yellow: 4,
            cyan: 4,
            black: 4,
            white: 0,
        },
        2,
        // prettier-ignore
        [
            "GMP",
            "ABA",
            "QMO"
        ],
        {
            A: "spectrum:raw_azurite",
            G: "malum:blighted_gunk",
            M: "spectrum:midnight_chip",
            B: "minecraft:dragon_breath",
            P: "botania:pixie_dust",
            Q: "hexcasting:quenched_allay_shard",
            O: "biomancy:organic_compound",
        },
        "spectrum:unlocks/items/bottle_of_ruin",
        "spectrum:pedestal/tier3/bottle_of_ruin"
    );

    event.recipes
        .createMixing("hexcasting:creative_unlocker", [
            "spectrum:resonance_shard",
            "the_bumblezone:royal_jelly_block",
            "create:experience_nugget",
        ])
        .superheated();

    event.remove({ id: "botania:terra_plate/terrasteel_ingot" });
    event
        .custom({
            type: "botania:terra_plate",
            ingredients: [
                {
                    item: "botania:manasteel_ingot",
                },
                {
                    item: "botania:mana_pearl",
                },
                {
                    item: "botania:mana_diamond",
                },
                {
                    item: "spectrum:vegetal",
                },
            ],
            mana: 500000,
            result: {
                item: "botania:terrasteel_ingot",
            },
        })
        .id("botania:terra_plate/terrasteel_ingot");

    const sapling_recipe = (tier, pigments, type) => {
        let result = "spectrum:" + type + "_sapling";
        event.remove({ output: result });
        event
            .custom({
                type: "spectrum:pedestal",
                group: "colored_saplings",
                time: 160,
                tier: tier,
                cyan: pigments.cyan,
                magenta: pigments.magenta,
                yellow: pigments.yellow,
                white: pigments.white,
                black: pigments.black,
                experience: 1.0,
                pattern: [
                    // prettier-ignore
                    "DMD",
                    "VSV",
                    "DMD",
                ],
                key: {
                    S: {
                        tag: "minecraft:saplings",
                    },
                    V: {
                        item: "spectrum:vegetal",
                    },
                    D: {
                        item: "minecraft:" + type + "_dye",
                    },
                    M: {
                        item: "hexerei:moon_dust",
                    },
                },
                result: {
                    item: result,
                    count: 1,
                },
                required_advancement:
                    "spectrum:unlocks/colored_saplings/" + type,
            })
            .id("spectrum:pedestal/tier1/saplings/" + type);
    };

    sapling_recipe(
        "advanced",
        {
            cyan: 0,
            magenta: 0,
            yellow: 0,
            white: 0,
            black: 6,
        },
        "black"
    );

    sapling_recipe(
        "basic",
        {
            cyan: 3,
            magenta: 2,
            yellow: 1,
            white: 0,
            black: 0,
        },
        "blue"
    );

    sapling_recipe(
        "advanced",
        {
            cyan: 0,
            magenta: 1,
            yellow: 2,
            white: 0,
            black: 3,
        },
        "brown"
    );

    sapling_recipe(
        "basic",
        {
            cyan: 6,
            magenta: 0,
            yellow: 0,
            white: 0,
            black: 0,
        },
        "cyan"
    );

    sapling_recipe(
        "complex",
        {
            cyan: 0,
            magenta: 0,
            yellow: 0,
            white: 2,
            black: 4,
        },
        "gray"
    );

    sapling_recipe(
        "basic",
        {
            cyan: 2,
            magenta: 1,
            yellow: 3,
            white: 0,
            black: 0,
        },
        "green"
    );

    sapling_recipe(
        "basic",
        {
            cyan: 4,
            magenta: 2,
            yellow: 0,
            white: 0,
            black: 0,
        },
        "light_blue"
    );

    sapling_recipe(
        "complex",
        {
            cyan: 0,
            magenta: 0,
            yellow: 0,
            white: 4,
            black: 2,
        },
        "light_gray"
    );

    sapling_recipe(
        "basic",
        {
            cyan: 2,
            magenta: 0,
            yellow: 4,
            white: 0,
            black: 0,
        },
        "lime"
    );

    sapling_recipe(
        "basic",
        {
            cyan: 0,
            magenta: 6,
            yellow: 0,
            white: 0,
            black: 0,
        },
        "magenta"
    );

    sapling_recipe(
        "basic",
        {
            cyan: 0,
            magenta: 2,
            yellow: 4,
            white: 0,
            black: 0,
        },
        "orange"
    );

    sapling_recipe(
        "basic",
        {
            cyan: 0,
            magenta: 4,
            yellow: 2,
            white: 0,
            black: 0,
        },
        "pink"
    );

    sapling_recipe(
        "basic",
        {
            cyan: 2,
            magenta: 3,
            yellow: 1,
            white: 0,
            black: 0,
        },
        "purple"
    );

    sapling_recipe(
        "basic",
        {
            cyan: 0,
            magenta: 3,
            yellow: 3,
            white: 0,
            black: 0,
        },
        "red"
    );

    sapling_recipe(
        "complex",
        {
            cyan: 0,
            magenta: 0,
            yellow: 0,
            white: 6,
            black: 0,
        },
        "white"
    );

    sapling_recipe(
        "basic",
        {
            cyan: 0,
            magenta: 0,
            yellow: 6,
            white: 0,
            black: 0,
        },
        "yellow"
    );

    event.remove({ output: "malum:totemic_staff" });
    event.shaped(
        Item.of("malum:totemic_staff", 1),
        // prettier-ignore
        [
                " DP",
                " SD",
                "S  "
            ],
        {
            P: {
                tag: "malum:runewood_planks",
            },
            S: {
                tag: "c:rods/wooden",
            },
            D: {
                tag: "forge:dusts/sulfur",
            },
        }
    );
    // malum does their book wrong, we can't have a recipe

    event.forEachRecipe(
        { type: "minecraft:smelting", output: "eidolon:pewter_ingot" },
        (recipe) => {
            const json = recipe.json;
            const input = json.get("ingredient");

            event.custom({
                type: "botania:mana_infusion",
                input: input,
                mana: 100,
                output: {
                    item: "eidolon:pewter_ingot",
                },
            });
        }
    );

    event.remove([
        { type: "minecraft:smelting", output: "eidolon:pewter_ingot" },
        { type: "minecraft:blasting", output: "eidolon:pewter_ingot" },
    ]);

    event.shapeless(tome, ["9x minecraft:book"]);
});

PlayerEvents.loggedIn((event) => {
    const player = event.player;
    if (!player.stages.has("starter_items")) {
        player.stages.add("starter_items");
        player.give(tome);
    }
});
