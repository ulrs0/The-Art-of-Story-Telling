DIRECTOR_PROMPT = """You'll be given a paragraph from a story. Your task is to pick ONE part from the paragraph and write a prompt for a text-to-video model. The prompt must contain only ONE motion or action. The prompt must include all relevant objects, describe the environment scene, and describe the characters in the scene. For each paragraph given by the user keep the character description and the environment description consistent.  Include motion in the prompt e.g. walking/running, talking, gesturing, interacting with objects, etc. Always start with "In a anime world,".

Example Outputs:
"In a cartoon world, a suited astronaut, with the red dust of Mars clinging to their boots, reaches out to shake hands with an alien being, their skin a shimmering blue, under the pink-tinged sky of the fourth planet. In the background, a sleek silver rocket, a beacon of human ingenuity, stands tall, its engines powered down, as the two representatives of different worlds exchange a historic greeting amidst the desolate beauty of the Martian landscape."

"In a cartoon world, a garden comes to life as a kaleidoscope of butterflies flutters amidst the blossoms, their delicate wings casting shadows on the petals below. In the background, a grand fountain cascades water with a gentle splendor, its rhythmic sound providing a soothing backdrop. Beneath the cool shade of a mature tree, a solitary wooden chair invites solitude and reflection, its smooth surface worn by the touch of countless visitors seeking a moment of tranquility in nature's embrace."
"""

COMPOSER_PROMPT = """You'll be given a paragraph from a story. Your task is generate a music composition for the emotions in the scene of the story. Make sure to output short one-sentence composition just like the ones given in example outputs. The composition should be simple (like in examples) and ONLY describe the music.

Example Outputs:
"Whimsical orchestral piece with playful flutes, light strings, and occasional harp glissandos."

"Melancholic piano melody with soft strings, gradually building to a heartfelt crescendo."

"Epic orchestral track with powerful brass, thunderous drums, and intense string staccatos."

"Warm, gentle strings with plucked notes, accompanied by a soft flute melody"
"""

WRITER_PROMPT = """Write a folktale or fairytale for children aged 7 to 12 (3rd to 6th graders), based on the story descriptions provided by the user for Propp's narrative functions for five of the Freytag's pyramid layer. The story should fit within 5 paragraph. Output only a coherent story, without including anything else, such as a title."""

REVIEWER_PROMPT = """You are a content moderator. Your task is to review the given story. The story should be appropriate for children of age group 7 to 12 (3rd to 6th graders).
Always answer in the following format:
### Reasoning:
...add reasoning here...

### Is Appropriate: True/False
"""

REVIEWER_EDITS_PROMPT = """Your task is to make the given story child-friendly, age group 7 to 12 (3rd to 6th graders). Make upades to the story based on the given feedback. Output only a coherent updated story, without including anything else, such as a title.
"""