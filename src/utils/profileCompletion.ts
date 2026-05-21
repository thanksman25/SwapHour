export const calculateCompletion = (user: any): number => {
    let score = 0;

    //// Asumsi 4 field utama yang menyumbang persentase kelengkapan
    if(user.email) score += 25;
    if(user.name) score += 25;
    if(user.bio) score += 25;
    if(user.avatar_url) score += 25;

    return score;
}