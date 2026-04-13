import useProviderApi from '@/src/hooks/apiHooks/useProviderApi';
import { useCallback, useEffect, useState } from 'react';

export interface Step1FormState {
    name: string;
    phone: string; // ✅ ADDED
    city: string;
    selectedCategory: string;
    selectedSkills: string[];
    selectedLanguages: string[];
    experience: string;
    bio: string;
    photoUri: string | null;
}

export interface UseStep1Return {
    form: Step1FormState;

    setName: (v: string) => void;
    setPhone: (v: string) => void; // ✅ ADDED
    setCity: (v: string) => void;
    setExperience: (v: string) => void;
    setBio: (v: string) => void;
    setPhotoUri: (v: string | null) => void;

    handleCategorySelect: (cat: string) => void;
    toggleSkill: (v: string) => void;
    toggleLanguage: (v: string) => void;

    categories: string[];
    skills: string[];
    languages: string[];

    categoriesLoading: boolean;
    skillsLoading: boolean;
    isSubmitting: boolean;
}

export const LANGUAGES = ['Hindi', 'English', 'Marathi', 'Tamil', 'Telugu', 'Bengali', 'Kannada', 'Punjabi'];
export const EXPERIENCE_OPTIONS = ['< 1 yr', '1–2 yrs', '3–5 yrs', '5–10 yrs', '10+ yrs'];

export default function useStep1(): UseStep1Return {
    const { getCategories, getSkills, isLoading: isSubmitting } = useProviderApi();

    // ── Remote data ──────────────────────────────────────────────────────────
    const [categories, setCategories] = useState<string[]>([]);
    const [skills, setSkills] = useState<string[]>([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [skillsLoading, setSkillsLoading] = useState(false);

    // ── Form state ───────────────────────────────────────────────────────────
    const [name, setName] = useState('');
    const [phone, setPhone] = useState(''); // ✅ ADDED
    const [city, setCity] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [experience, setExperience] = useState('');
    const [bio, setBio] = useState('');
    const [photoUri, setPhotoUri] = useState<string | null>(null);

    // ── Fetch categories ─────────────────────────────────────────────────────
    useEffect(() => {
        (async () => {
            setCategoriesLoading(true);
            const data = await getCategories();
            setCategories(data);
            setCategoriesLoading(false);
        })();

    }, [getCategories]);
    // ── Fetch skills ─────────────────────────────────────────────────────────
    const handleCategorySelect = useCallback(async (cat: string) => {
        if (selectedCategory === cat) {
            setSelectedCategory('');
            setSkills([]);
            setSelectedSkills([]);
            return;
        }

        setSelectedCategory(cat);
        setSelectedSkills([]);
        setSkillsLoading(true);

        const data = await getSkills({ category: cat });

        setSkills(data);
        setSkillsLoading(false);

    }, [selectedCategory, getSkills]);
    const toggleSkill = (val: string) =>
        setSelectedSkills((prev) =>
            prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]
        );

    const toggleLanguage = (val: string) =>
        setSelectedLanguages((prev) =>
            prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]
        );

    return {
        form: {
            name,
            phone, // ✅ INCLUDED
            city,
            selectedCategory,
            selectedSkills,
            selectedLanguages,
            experience,
            bio,
            photoUri,
        },

        setName,
        setPhone, // ✅ RETURNED
        setCity,
        setExperience,
        setBio,
        setPhotoUri,

        handleCategorySelect,
        toggleSkill,
        toggleLanguage,

        categories,
        skills,
        languages: LANGUAGES,

        categoriesLoading,
        skillsLoading,
        isSubmitting,
    };
}