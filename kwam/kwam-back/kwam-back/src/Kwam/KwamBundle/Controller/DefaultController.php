<?php

namespace Kwam\KwamBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Kwam\KwamBundle\Entity\User;
use Kwam\KwamBundle\Entity\Kwam;
use Kwam\KwamBundle\Entity\Post;
class DefaultController extends Controller
{
    public function indexAction($name)
    {
        //die();
        return $this->render('KwamKwamBundle:Default:index.html.twig', array('name' => $name));
    }

    public function generateUsersAction()
    {
    
        for($i=0; $i <150; $i++){
            $userData = json_decode(file_get_contents('http://api.randomuser.me/'));
           
            $user = new User(); 
            $user->setUsername($userData->results[0]->user->username);
            $user->setAvatar($userData->results[0]->user->password);
            $user->setEmail($userData->results[0]->user->email);
            $user->setAvatar($userData->results[0]->user->picture->large);
            $user->setPassword($userData->results[0]->user->password);


            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

            print_r($user);
        
        }
        
        die();
        
        return $this->render('KwamKwamBundle:Default:index.html.twig', array('name' => $name));
    }

    public function generateTastKwamAction()
    {
        $kwam = new Kwam();
        $kwam->setTopic('Bill Cosby')
             ->setMainPicture('http://a5.files.biography.com/image/upload/c_fill,dpr_1.0,g_face,h_300,q_80,w_300/MTE1ODA0OTcxNTk2OTQwODEz.jpg')
             ->setUserId(1);

        $em = $this->getDoctrine()->getManager();
        $em->persist($kwam);
        $em->flush();

        die(print_r($kwam));

    }

    public function getKwamAction($topic){
        $repository = $this->getDoctrine()
            ->getRepository('KwamKwamBundle:Kwam');
        
        $kwam = $repository->findOneByTopic($topic);
    
        
        $array = array('topic'=>$kwam->getTopic(), 'reson'=> $kwam->getReason(),'picture'=>$kwam->getMainPicture());
        $repository = $this->getDoctrine()
            ->getRepository('KwamKwamBundle:User');
        $userData = $repository->findById($kwam->getUserId());
       
        $array['moderator'] = $userData[0]->getUsername();
        $array['moderator_avatar'] = $userData[0]->getAvatar();

        $repository = $this->getDoctrine()
            ->getRepository('KwamKwamBundle:Post');

        $messagData = $repository->findByKwamId($kwam->getId());
        foreach($messagData as $message){
            $repository = $this->getDoctrine()
                ->getRepository('KwamKwamBundle:User');
            $userData = $repository->findById($message->getUserId());
            
            $array['messages'][] = array('user'=>$userData[0]->getUsername(),'avatar'=>$userData[0]->getAvatar() , 'type'=> $message->getMessageType(),'message'=> $message->getMessage(), 'topic_id' => $kwam->getId());
        }
        $array['messages'] = array_reverse($array['messages']); 
        header("Access-Control-Allow-Origin: *");
        return  new JsonResponse($array);
        //die(print_r($kwam));

    }

    public function getTopTopicsAction(){
        define('TOPIC_LIMT',6);
        $topics = array();
        $repository = $this->getDoctrine()
                ->getRepository('KwamKwamBundle:Kwam');

        $kwamData = $repository->findAll();
        $topicIndex = 1;
        foreach($kwamData as $topic){
            $topics[] = $topic->getTopic();
            $topicIndex++;
            if($topicIndex == TOPIC_LIMT) break;
        }
        header("Access-Control-Allow-Origin: *");
        return new JsonResponse($topics);
    }

    public function getRecentPostsAction(){
        $postsArray = array();
        $repository = $this->getDoctrine()
            ->getRepository('KwamKwamBundle:Post');

        $query = $repository->createQueryBuilder('p')
            ->orderBy('p.id', 'DESC')
            ->where('p.messageType = :text')
            ->setParameter('text','text')
            ->setMaxResults(5)
            ->getQuery();

        
        $posts = $query->getResult();
        foreach($posts as $post){
            $user = $this->getPostUser($post->getUserId());
            $kwam = $this->getPostTopic($post->getKwamId());
            //die(var_dump($kwam));
            $postsArray[] = array(
                'user' => $user['user'],
                'avatar' => $user['avatar'],
                'message' => array(
                                'topic' => $kwam['topic'],
                                'picture' => $kwam['main_picture'],
                                'type' => $post->getMessageType(),
                                'data' => $post->getMessage(),
                            ),
                

            );
        }

        header("Access-Control-Allow-Origin: *");
        return new JsonResponse($postsArray);

    }

    public function createPostAction(){
        $repository = $this->getDoctrine()
            ->getRepository('KwamKwamBundle:Kwam');
        $kwam = $repository->findOneByTopic($_POST['topic']);
        
        $post = new Post();

        $post->setUserId($_POST['user'])
            ->setKwamId($kwam->getId())
            ->setMessageType('text')
            ->setMessage($_POST['message']);
        
        $em = $this->getDoctrine()->getManager();
        $em->persist($post);
        $em->flush();
        header("Access-Control-Allow-Origin: *");
        return  new JsonResponse(array("newPost", $post->getMessage(), "success", 'TRUE'));
    }

    private function getPostUser($userid){
        $repository = $this->getDoctrine()
            ->getRepository('KwamKwamBundle:User');
        $userData = $repository->findById($userid);
        
        return array('user'=>$userData[0]->getUsername(),'avatar'=>$userData[0]->getAvatar());
    
    }

    private function getPostTopic($kwamid){
        $repository = $this->getDoctrine()
            ->getRepository('KwamKwamBundle:Kwam');
        $kwamData = $repository->findById($kwamid);
        
        return array('topic'=>$kwamData[0]->getTopic(),'main_picture'=>$kwamData[0]->getMainPicture());
    
    }
}
