import random

def generate_sop_text(name, course, achievements, reason):
    """
    Generates a structured SOP based on inputs.
    Using a template-based approach with variations for uniqueness.
    """
    
    openings = [
        f"To the Admissions Committee,\n\nI am writing to express my strong interest in the {course} program. My name is {name}, and I have always been passionate about using technology to solve real-world problems.",
        f"Dear Scholarship Committee,\n\nWith a deep passion for {course}, I, {name}, submit this statement of purpose to demonstrate my commitment to academic excellence and my future career goals.",
        f"To Whom It May Concern,\n\nMy journey in {course} has been defined by curiosity and resilience. I am {name}, and I aspire to contribute meaningfully to this field."
    ]

    body_1 = [
        f"Throughout my academic journey, I have strived for excellence. {achievements}",
        f"I have consistently pushed my limits. {achievements}",
        f"My academic and extra-curricular track record speaks to my dedication. {achievements}"
    ]

    body_2 = [
        f"Financial assistance would be a turning point for me. {reason} This scholarship will allow me to focus entirely on my studies without the burden of financial stress.",
        f"Receiving this scholarship would mean the world to me and my family. {reason} It would empower me to pursue my dreams in {course}."
    ]

    closing = [
        "Thank you for considering my application. I am eager to prove my potential and give back to the community.",
        "I strictly believe that I have the zeal and the potential to succeed. Thank you for your time and consideration.",
        "I look forward to the possibility of being a part of this prestigious community. Thank you for your consideration."
    ]

    sop = f"""{random.choice(openings)}

{random.choice(body_1)}

{random.choice(body_2)}

{random.choice(closing)}

Sincerely,
{name}"""

    return sop
